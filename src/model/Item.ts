export default class Item {
  name = ''
  score = 0

  constructor(option: { name: string; score?: number }) {
    this.name = option.name
    this.score = option.score || this.score
  }
}
