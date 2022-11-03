// import chatWindow from './components/chatwindow/chatWindow';
// import chatConfig from './components/chatwindow/config/kore-config';
import KRSearch from './components/search/findly-sdk';
import KRSearchConfig from './components/search/config/findly-config';
import Korei18nPlugin from './plugins/i18n';
import KoreFileUploaderPlugin from './plugins/fileUploaderPlugin/fileUploader';
import KorePickersPlugin from './plugins/korePickers';
import GraphTemplatesPlugin from './plugins/graphTemplatesPlugin';
import WebKitSTT from './plugins/STTPlugins/WebKitSTTPlugin/WebKitSTTPlugin';
import BrowserTTS from './plugins/TTSPlugins/BrowserTTSPlugin/BrowserTTSPlugin';
// import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';
//import speakTextWithAWSPolly from './plugins/TTSPlugins/KoreAWSPollyPlugin/kore-aws-polly';
import AgentDesktopPlugin from './plugins/agentDesktop/agentdesktop';



export {
  KRSearch,
  KRSearchConfig,
  Korei18nPlugin,
  KoreFileUploaderPlugin,
  KorePickersPlugin,
  GraphTemplatesPlugin,
  WebKitSTT,
  BrowserTTS,
  //speakTextWithAWSPolly,
  AgentDesktopPlugin
};
