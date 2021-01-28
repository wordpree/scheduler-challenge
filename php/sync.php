<?php

require_once "session.php";

$session_data  = $_SESSION["data"];
$eventIds      = [];
$resourceIds   = [];
$assignmentIds = [];

function handleCrud($pack, $entityName, array &$idMap) {
    global $session_data;
    $changed = [];
    $removed = [];

    $rows = &$session_data[$entityName]["rows"];

    if (isset($pack[$entityName])) {
        if (isset($pack[$entityName]["updated"])) {
            foreach ($pack[$entityName]["updated"] as $mod) {
                $key    = array_search($mod["id"], array_column($rows, "id"));
                $record = $rows[$key];
                if (isset($record)) {
                    foreach ($mod as $field => $value) {
                        if ($field != '$PhantomId') {
                            $record[$field] = $value;
                        }
                    }
                    $record["dt"] = date("Y-m-d H:i:s");
                    $changed[]    = $record;
                    $rows[$key]   = $record;
                }
            }
        }

        if (isset($pack[$entityName]["added"])) {
            foreach ($pack[$entityName]["added"] as $mod) {
                // Create new id
                $mod["id"] = count($rows) + 1;
                $mod["dt"] = date("Y-m-d H:i:s");
                // Replace Phantom Id's with real values
                replaceIds($mod);
                $changed[] = $mod;
                // Store phantomId to IdMap
                $idMap[$mod['$PhantomId']] = $mod["id"];
                unset($mod['$PhantomId']);
                $rows[] = $mod;
            }
        }

        if (isset($pack[$entityName]["removed"])) {
            foreach ($pack[$entityName]["removed"] as $mod) {
                $key = array_search($mod["id"], array_column($rows, "id"));
                array_splice($rows, $key, 1);
                $removed[] = $mod;
            }
        }
    }

    return ["changed" => $changed, "removed" => $removed];
}

function replaceId(&$record, $idName, $idMap) {
    if (isset($record[$idName])) {
        $id = $record[$idName];
        if (isset($idMap[$id])) {
            $record[$idName] = $idMap[$id];
        }
    }
}

function replaceIds(&$record) {
    global $eventIds;
    global $resourceIds;
    replaceId($record, "eventId", $eventIds);
    replaceId($record, "resourceId", $resourceIds);
}

$pack = json_decode(file_get_contents('php://input'), true);

$events      = handleCrud($pack, "events", $eventIds);
$resources   = handleCrud($pack, "resources", $resourceIds);
$assignments = handleCrud($pack, "assignments", $assignmentIds);

$_SESSION["data"] = $session_data;

sendData(
    [
        "success"     => true,
        "sid"         => session_id(),
        "resources"   => ["rows" => $resources["changed"], "removed" => $resources["removed"]],
        "events"      => ["rows" => $events["changed"], "removed" => $events["removed"]],
        "assignments" => ["rows" => $assignments["changed"], "removed" => $assignments["removed"]]
    ]
);
