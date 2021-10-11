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

  public static getRandomLetter() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';

    const rnd = Math.floor(Math.random() * letters.length);

    return letters.charAt(rnd);
  }
}
