import LocaleManager from '../../../lib/Core/localization/LocaleManager.js';
//<umd>
import LocaleHelper from '../../../lib/Core/localization/LocaleHelper.js';
import Nl from '../../../lib/SchedulerPro/localization/Nl.js';
import SharedNl from './shared.locale.Nl.js';

const examplesNlLocale = LocaleHelper.mergeLocales(SharedNl, {

    extends : 'Nl',

    Button : {
        'Add column'    : 'Kolom toevoegen',
        'Remove column' : 'Kolom verwijderen'
    },

    Column : {
        Capacity           : 'Capaciteit',
        City               : 'Stad',
        Company            : 'Bedrijf',
        Duration           : 'Looptijd',
        'Employment type'  : 'Type werkgeverschap',
        End                : 'Einde',
        'First name'       : 'Voornaam',
        Id                 : '#',
        Machines           : 'Machines',
        Name               : 'Naam',
        'Nbr tasks'        : 'Numerieke taken',
        'Production line'  : 'Productielijn',
        Rating             : 'Beoordeling',
        Role               : 'Rol',
        Score              : 'Score',
        Staff              : 'Personeel',
        Start              : 'Begin',
        Surname            : 'Achternaam',
        'Task color'       : 'Taakkleur',
        Type               : 'Type',
        'Unassigned tasks' : 'Niet-toegewezen taken'
    },

    Combo : {
        'Group by' : 'Groeperen door'
    },

    EventEdit : {
        Location : 'Plaats'
    },

    MenuItem : {
        'Custom header item' : 'Aangepast header-item',
        'Custom cell action' : 'Aangepaste celactie'
    },

    Slider : {
        'Font size' : 'Lettertypegrootte'
    }

});

LocaleHelper.publishLocale('Nl', Nl);
LocaleHelper.publishLocale('NlExamples', examplesNlLocale);

export default examplesNlLocale;
//</umd>

LocaleManager.extendLocale('Nl', examplesNlLocale);
