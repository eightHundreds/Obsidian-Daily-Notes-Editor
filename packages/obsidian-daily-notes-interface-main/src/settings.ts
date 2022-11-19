import {
  DEFAULT_DAILY_NOTE_FORMAT,
  DEFAULT_MONTHLY_NOTE_FORMAT,
  DEFAULT_WEEKLY_NOTE_FORMAT,
  DEFAULT_QUARTERLY_NOTE_FORMAT,
  DEFAULT_YEARLY_NOTE_FORMAT,
} from "./constants";
import { IPeriodicNoteSettings } from "./types";

function getPeriodicNotesSettings(){
  const periodicNotes = (<any>window.app).plugins.getPlugin("periodic-notes");
  if(!periodicNotes.settings) return false;
  let settings: any;
  periodicNotes.settings.subscribe((a)=>settings=a)();
  // beta版的period将配置放到calendarSets, 这里将它还原成旧版配置
  return Object.entries(settings.calendarSets[0]).reduce((acc, [key, value]:any)=>{
    return {
      ...acc,
      [key]: {
        ...value,
        template: value.templatePath
      }
    }
  },{})
}

export function shouldUsePeriodicNotesSettings(
  periodicity: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
): boolean {
  return getPeriodicNotesSettings()?.[periodicity]?.enabled;
}

/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
export function getDailyNoteSettings(): IPeriodicNoteSettings {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { internalPlugins, plugins } = <any>window.app;

    if (shouldUsePeriodicNotesSettings("daily")) {
      const { format, folder, template } = getPeriodicNotesSettings()?.daily || {};
      return {
        format: format || DEFAULT_DAILY_NOTE_FORMAT,
        folder: folder?.trim() || "",
        template: template?.trim() || "",
      };
    }

    const { folder, format, template } =
      internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
    return {
      format: format || DEFAULT_DAILY_NOTE_FORMAT,
      folder: folder?.trim() || "",
      template: template?.trim() || "",
    };
  } catch (err) {
    console.info("No custom daily note settings found!", err);
  }
}

/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
export function getWeeklyNoteSettings(): IPeriodicNoteSettings {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = (<any>window.app).plugins;

    const calendarSettings = pluginManager.getPlugin("calendar")?.options;
    const periodicNotesSettings = getPeriodicNotesSettings()?.weekly;

    if (shouldUsePeriodicNotesSettings("weekly")) {
      return {
        format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
        folder: periodicNotesSettings.folder?.trim() || "",
        template: periodicNotesSettings.template?.trim() || "",
      };
    }

    const settings = calendarSettings || {};
    return {
      format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
      folder: settings.weeklyNoteFolder?.trim() || "",
      template: settings.weeklyNoteTemplate?.trim() || "",
    };
  } catch (err) {
    console.info("No custom weekly note settings found!", err);
  }
}

/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
export function getMonthlyNoteSettings(): IPeriodicNoteSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pluginManager = (<any>window.app).plugins;

  try {
    const settings =
      (shouldUsePeriodicNotesSettings("monthly") && getPeriodicNotesSettings()?.monthly) ||
      {};

    return {
      format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
      folder: settings.folder?.trim() || "",
      template: settings.template?.trim() || "",
    };
  } catch (err) {
    console.info("No custom monthly note settings found!", err);
  }
}

/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
export function getQuarterlyNoteSettings(): IPeriodicNoteSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  try {
    const settings =
      (shouldUsePeriodicNotesSettings("quarterly") &&
      getPeriodicNotesSettings()?.quarterly) ||
      {};

    return {
      format: settings.format || DEFAULT_QUARTERLY_NOTE_FORMAT,
      folder: settings.folder?.trim() || "",
      template: settings.template?.trim() || "",
    };
  } catch (err) {
    console.info("No custom quarterly note settings found!", err);
  }
}

/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
export function getYearlyNoteSettings(): IPeriodicNoteSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try {
    const settings =
      (shouldUsePeriodicNotesSettings("yearly") &&
      getPeriodicNotesSettings()?.yearly) ||
      {};

    return {
      format: settings.format || DEFAULT_YEARLY_NOTE_FORMAT,
      folder: settings.folder?.trim() || "",
      template: settings.template?.trim() || "",
    };
  } catch (err) {
    console.info("No custom yearly note settings found!", err);
  }
}
