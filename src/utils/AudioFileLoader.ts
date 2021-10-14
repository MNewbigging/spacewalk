import { Howl } from 'howler';

import { gameObserver, GameEventType } from '../events/GameObserver';

import '../assets/background-base.wav';
import '../assets/asteroidbelt_a.ogg';

export class AudioFileLoader {
  constructor(private audioMap: Map<string, Howl>) {
    this.loadAudioFiles();
  }

  private loadAudioFiles() {
    const onLoadError = (id: string) => console.log('error loading audio file ' + id);

    // Background audio
    const bgBaseId = 'background-base';
    const bgBase = new Howl({
      src: ['../assets/background-base.wav'],
      onloaderror: () => onLoadError(bgBaseId),
      onload: this.onLoadAudioFile,
      preload: false,
    });
    this.audioMap.set(bgBaseId, bgBase);

    // Letter audio

    // Now load everything in the map
    Array.from(this.audioMap.values()).forEach((howl) => howl.load());
  }

  private onLoadAudioFile = () => {
    // filter down by loading files
    const audio: Howl[] = Array.from(this.audioMap.values());
    const loading = audio.filter((howl) => howl.state() === 'loading');

    // If nothing in loading, we're done loading
    if (!loading.length) {
      gameObserver.fireEvent({ type: GameEventType.AUDIO_LOADED });
    }
  };
}
