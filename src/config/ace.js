import ace from 'ace-builds';
import 'ace-builds/src-noconflict/ext-language_tools';
import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
import snippetsJsUrl from 'ace-builds/src-noconflict/snippets/javascript?url';
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
import workerBaseUrl from 'ace-builds/src-noconflict/worker-base?url';
import workerJavascriptUrl from 'ace-builds/src-noconflict/worker-javascript?url';

ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);
ace.config.setModuleUrl('ace/mode/base', workerBaseUrl);
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);
ace.config.setModuleUrl('ace/snippets/javascript', snippetsJsUrl);
ace.require('ace/ext/language_tools');
