import os from 'os'
import { RecordSetting } from 'src/types/streamer'
import { Config, GeneralSetting, VodSetting } from 'src/types/config'

export default class ConfigSystem {
  static filename = 'configuration'

  static defaultGeneralSetting: GeneralSetting = {
    checkStreamInterval: 30,
    dirToSaveRecord: os.homedir(),
    numOfDownloadLimit: 0,
    showDownloadCmd: true
  }

  static explanationGeneralSetting = {
    checkStreamInterval: 'interval for online check (unit: seconds)',
    dirToSaveRecord: 'directory path where files save',
    numOfDownloadLimit: 'numbers of recorder allow to run, set 0 as unlimited',
    showDownloadCmd: 'show download command prompt'
  }

  static defaultVodSetting: VodSetting = {
    reTryDownloadInterval: 10,
    maxReDownloadTimes: 10,
    LossOfVODDurationAllowed: 10,
    IntegrityCheck: true
  }

  static explanationVodSetting = {
    reTryDownloadInterval:
      'minutes to download VOD again when VOD download is failed',
    maxReDownloadTimes: 'maximum times to download VOD',
    LossOfVODDurationAllowed:
      'acceptable amount of loss duration (unit: seconds)',
    IntegrityCheck: 'check duration while VOD downloaded'
  }

  static defaultRecordSetting: RecordSetting = {
    enableRecord: true,
    enableNotify: true,
    vodEnableRecordVOD: true,
    vodIsStopRecordStream: true,
    vodGetStreamIfNoVod: true,
    vodMode: 'queue',
    vodCountDownInMinutes: 30,
    vodTimeZone: new Date(2022, 1, 10, 3, 0).toISOString(),
    vodFileNameTemplate: '{channel}_TwitchVOD_{date}_{duration}',
    checkStreamContentTypeEnable: true,
    checkStreamContentTypeTargetGameNames: 'Art;Just Chatting;',
    fileNameTemplate: '{channel}_TwitchLive_{date}'
  }

  static explanationRecordSetting = {
    enableRecord: 'enable record stream or vod',
    enableNotify: 'enable online notify',
    vodEnableRecordVOD: 'enable record vod',
    vodIsStopRecordStream: 'disable record stream while vod is available',
    vodGetStreamIfNoVod: 'enable record stream while vod is not available',
    vodMode:
      'VOD download mode, three mode available, queue, timeZone and countDown',
    vodCountDownInMinutes: 'download VOD after x minutes',
    vodTimeZone: 'download VOD at specified time zone',
    vodFileNameTemplate: 'Specify a default filename for live stream downloads',
    checkStreamContentTypeEnable: 'enable check game name',
    checkStreamContentTypeTargetGameNames:
      'check stream game names, stop record if not included. Use ";" to separate tags. e.g. Art;Just Chatting',
    fileNameTemplate: 'Specify a default filename for VOD downloads'
  }

  static defaultSetting: Config = {
    vod: ConfigSystem.defaultVodSetting,
    record: ConfigSystem.defaultRecordSetting,
    general: ConfigSystem.defaultGeneralSetting
  }

  static explanation = {
    vod: ConfigSystem.explanationVodSetting,
    record: ConfigSystem.explanationRecordSetting,
    general: ConfigSystem.explanationGeneralSetting
  }

  static recordModeList = [
    { value: 'queue', label: 'Queue' },
    { value: 'timeZone', label: 'Time Zone' },
    { value: 'countDown', label: 'Count Down' }
  ] as const

  static vodModeExplanation = [
    {
      mode: 'Queue',
      explanation: 'download VODs in queue'
    },
    {
      mode: 'Count Down',
      explanation: 'download VOD after x minutes'
    },
    {
      mode: 'Time Zone',
      explanation: 'download VOD at specified time zone'
    }
  ]

  static wildcardExplanation = [
    {
      wildcard: '{id}',
      description: 'Twitch Video ID (VOD only)',
      example: '335921245'
    },
    {
      wildcard: '{streamer}',
      description: 'streamer account',
      example: 'TwitchDev'
    },
    {
      wildcard: '{title}',
      description: 'Video Title',
      example: 'Welcome to Twitch development!'
    },
    {
      wildcard: '{year}',
      description: 'Year',
      example: '2022'
    },
    {
      wildcard: '{month}',
      description: 'Month',
      example: '03'
    },
    {
      wildcard: '{day}',
      description: 'Day',
      example: '31'
    },
    {
      wildcard: '{hr}',
      description: 'Hour (00-23)',
      example: '19'
    },
    {
      wildcard: '{min}',
      description: 'Minutes',
      example: '47'
    },
    {
      wildcard: '{sec}',
      description: 'Seconds',
      example: '55'
    },
    {
      wildcard: '{duration}',
      description: 'Twitch Video Duration (VOD only)',
      example: '3h30m4s'
    }
  ]
}
