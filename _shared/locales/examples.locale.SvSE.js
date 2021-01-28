import LocaleManager from '../../../lib/Core/localization/LocaleManager.js';
//<umd>
import LocaleHelper from '../../../lib/Core/localization/LocaleHelper.js';
import SvSE from '../../../lib/SchedulerPro/localization/SvSE.js';
import SharedSvSE from './shared.locale.SvSE.js';

const examplesSvSELocale = LocaleHelper.mergeLocales(SharedSvSE, {

    extends : 'SvSE',

    Button : {
        'Add column'    : 'Lägg till kolumn',
        'Remove column' : 'Ta bort kolumn'
    },

    Column : {
        Capacity           : 'Kapacitet',
        City               : 'Stad',
        Company            : 'Företag',
        Duration           : 'Längd',
        'Employment type'  : 'Anställning',
        End                : 'Slut',
        'First name'       : 'Förnamn',
        Id                 : '#',
        Machines           : 'Maskiner',
        Name               : 'Namn',
        'Nbr tasks'        : 'Antal aktiviteter',
        'Production line'  : 'Produktionslinje',
        Rating             : 'Betyg',
        Role               : 'Roll',
        Score              : 'Poäng',
        Staff              : 'Personal',
        Start              : 'Start',
        Surname            : 'Efternamn',
        'Task color'       : 'Uppgiftsfärg',
        Type               : 'Typ',
        'Unassigned tasks' : 'Otilldelade aktiviteter'
    },

    Combo : {
        'Group by' : 'Gruppera på'
    },

    EventEdit : {
        Location : 'Plats'
    },

    MenuItem : {
        'Custom header item' : 'Anpassad header-meny',
        'Custom cell action' : 'Anpassad cell-åtgärd'
    },

    Slider : {
        'Font size' : 'Fontstorlek'
    }
});

LocaleHelper.publishLocale('SvSE', SvSE);
LocaleHelper.publishLocale('SvSEExamples', examplesSvSELocale);

export default examplesSvSELocale;
//</umd>

LocaleManager.extendLocale('SvSE', examplesSvSELocale);
