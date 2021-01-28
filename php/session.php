<?php

session_start();

// Support for resetting data request
$reset = (bool) isset($_GET["reset"]) ? $_GET["reset"] : false;

if (!isset($_SESSION["data"]) || $reset) {

    // Initialize session's demo data
    $_SESSION["data"] = [
        "success"     => true,
        "sid"         => session_id(),
        "resources"   => [
            "rows" => [
                ["id" => 1, "car" => "Volvo V90", "dt" => date("Y-m-d H:i:s")],
                ["id" => 2, "car" => "Volvo XC60", "dt" => date("Y-m-d H:i:s")],
                ["id" => 3, "car" => "BMW M3", "dt" => date("Y-m-d H:i:s")],
                ["id" => 4, "car" => "BMW X5", "dt" => date("Y-m-d H:i:s")],
                ["id" => 5, "car" => "Peugeot 308", "dt" => date("Y-m-d H:i:s")]
            ]
        ],
        "events"      => [
            "rows" => [
                ["id" => 1, "name" => "Serve engine", "startDate" => "2018-05-21 08:00", "duration" => 2, "dt" => date("Y-m-d H:i:s")],
                ["id" => 2, "name" => "Paint job", "startDate" => "2018-05-21 12:00", "duration" => 2, "eventColor" => "violet", "dt" => date("Y-m-d H:i:s")],
                ["id" => 3, "name" => "Tune", "startDate" => "2018-05-21 07:00", "duration" => 1, "eventColor" => "teal", "dt" => date("Y-m-d H:i:s")],
                ["id" => 4, "name" => "Diagnostics", "startDate" => "2018-05-21 09:00", "duration" => 2, "eventColor" => "teal", "dt" => date("Y-m-d H:i:s")],
                ["id" => 5, "name" => "Replace engine", "startDate" => "2018-05-21 07:00", "duration" => 6, "dt" => date("Y-m-d H:i:s")],
                ["id" => 6, "name" => "New windshield", "startDate" => "2018-05-21 08:00", "duration" => 2, "dt" => date("Y-m-d H:i:s")],
                ["id" => 7, "name" => "Replace airbag", "startDate" => "2018-05-21 09:00", "duration" => 3, "dt" => date("Y-m-d H:i:s")],
                ["id" => 8, "name" => "Wash", "startDate" => "2018-05-21 14:00", "duration" => 2, "eventColor" => "blue", "dt" => date("Y-m-d H:i:s")],
                ["id" => 9, "name" => "Repair cooler (multi-assigned)", "startDate" => "2018-05-21 10:00", "duration" => 6, "dt" => date("Y-m-d H:i:s")]
            ]
        ],
        "assignments" => [
            "rows" => [
                ["id" => 1, "resourceId" => 1, "eventId" => 1],
                ["id" => 2, "resourceId" => 1, "eventId" => 2],
                ["id" => 3, "resourceId" => 2, "eventId" => 3],
                ["id" => 4, "resourceId" => 2, "eventId" => 4],
                ["id" => 5, "resourceId" => 3, "eventId" => 5],
                ["id" => 6, "resourceId" => 4, "eventId" => 6],
                ["id" => 7, "resourceId" => 4, "eventId" => 7],
                ["id" => 8, "resourceId" => 4, "eventId" => 8],
                ["id" => 9, "resourceId" => 2, "eventId" => 9],
                ["id" => 10, "resourceId" => 5, "eventId" => 9]
            ]
        ]
    ];
}

function sendData($data) {
    echo json_encode($data);
}
