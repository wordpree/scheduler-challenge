// eslint-disable-next-line no-unused-vars
window.introWidget = {
    type : 'scheduler',
    minHeight      : 250,
    subGridConfigs : {
        locked : { width : '10em' }
    },
    readOnly   : true,
    startDate  : new Date(2020, 4, 14, 7),
    endDate    : new Date(2020, 4, 14, 11, 30),
    viewPreset : 'hourAndDay',
    rowHeight  : 50,
    columns    : [
        {
            type     : 'template',
            text     : 'Name',
            field    : 'name',
            cellCls  : 'name',
            template : data => `<img src="_shared/images/users/${data.record.name.toLowerCase()}.jpg" alt=""/><dl><dt>${data.record.name}</dt><dd>${data.record.events.length} task(s)</dd></dl>`,
            width    : '10em'
        }
    ],

    resources : [
        { id : 1, name : 'Henrik' },
        { id : 2, name : 'Linda' },
        { id : 3, name : 'Rob' }
    ],
    events : [
        {
            id         : 1,
            resourceId : 1,
            startDate  : new Date(2020, 4, 14, 7, 30),
            endDate    : new Date(2020, 4, 14, 9),
            name       : 'Workout',
            eventColor : 'orange'
        },
        {
            id         : 2,
            resourceId : 2,
            startDate  : new Date(2020, 4, 14, 8),
            endDate    : new Date(2020, 4, 14, 10, 30),
            name       : 'Meeting',
            eventColor : 'blue'
        },
        { id : 3, resourceId : 3, startDate : new Date(2020, 4, 14, 10), endDate : new Date(2020, 4, 14, 10), name : 'Coffee break' }
    ]
};
