export class RandomUtils {
  public static createId(length = 4) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    for (let i = 0; i < length; i++) {
      const rnd = Math.floor(Math.random() * characters.length);
      id += characters.charAt(rnd);
    }

    return id;
  }

  public static getRandomRangeFloat(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  public static getRandomRangeInt(min: number, max: number) {
    return Math.floor(this.getRandomRangeFloat(min, max));
  }

  public static getRandomLetter() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    const rnd = Math.floor(Math.random() * letters.length);

    return letters.charAt(rnd);
  }
}
