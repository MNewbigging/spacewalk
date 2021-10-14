import { Howl } from 'howler';

import { gameObserver, GameEventType } from '../events/GameObserver';

import '../assets/background-base.wav';
import '../assets/asteroidbelt_a.ogg';
import '../assets/asteroidbelt_b.ogg';
import '../assets/asteroidbelt_c.ogg';
import '../assets/asteroidbelt_d.ogg';
import '../assets/asteroidbelt_e.ogg';
import '../assets/asteroidbelt_f.ogg';
import '../assets/asteroidbelt_g.ogg';
import '../assets/asteroidbelt_h.ogg';
import '../assets/asteroidbelt_i.ogg';
import '../assets/asteroidbelt_j.ogg';
import '../assets/asteroidbelt_k.ogg';
import '../assets/asteroidbelt_l.ogg';
import '../assets/asteroidbelt_m.ogg';
import '../assets/asteroidbelt_n.ogg';
import '../assets/asteroidbelt_o.ogg';
import '../assets/asteroidbelt_p.ogg';
import '../assets/asteroidbelt_q.ogg';
import '../assets/asteroidbelt_r.ogg';
import '../assets/asteroidbelt_s.ogg';
import '../assets/asteroidbelt_t.ogg';
import '../assets/asteroidbelt_u.ogg';
import '../assets/asteroidbelt_v.ogg';
import '../assets/asteroidbelt_w.ogg';
import '../assets/asteroidbelt_x.ogg';
import '../assets/asteroidbelt_y.ogg';
import '../assets/asteroidbelt_z.ogg';

export class AudioFileLoader {
  private basePath = '';

  constructor(private audioMap: Map<string, Howl>) {
    this.setBasePath();
    this.loadAudioFiles();
  }

  private setBasePath() {
    if (window.location.href.includes('localhost')) {
      this.basePath = '../assets/';
    } else {
      this.basePath = '/spacewalk/assets/';
    }
  }

  private loadAudioFiles() {
    const onLoadError = (id: string) => console.log('error loading audio file ' + id);

    // Background audio
    const bgBaseId = 'background-base';
    const bgBase = new Howl({
      src: [this.basePath + 'background-base.wav'],
      onloaderror: () => onLoadError(bgBaseId),
      onload: this.onLoadAudioFile,
      preload: false,
    });
    this.audioMap.set(bgBaseId, bgBase);

    // Letter audio
    const letters = 'abcdefghikjlmnopqrstuvwxyz'.split('');
    letters.forEach((char) => {
      const howl = new Howl({
        src: [this.basePath + `/asteroidbelt_${char}.ogg`],
        onloaderror: () => onLoadError(char),
        onload: this.onLoadAudioFile,
        preload: false,
      });
      this.audioMap.set(char, howl);
    });

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
