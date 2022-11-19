# 改动点
1. fork官方obsidian-daily-notes-interface-main
    1. 增加 getPeriodicNotesSettings, 他会将periodic 1.0.0 beta的配置读成旧版periodic的配置
    2. getDateFromFilename中的`const format = getSettings[granularity]().format;` 去掉`split('/').pop()`
    3. getAllDailyNotes中返回的note增加了displayName, 因为daily note editor只显示文件名, 但是我希望显示它的父目录+文件名
