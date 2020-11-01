import { fetch} from '@/plugin/axios';
export default {
  baseInf() {
    return new Promise(resolve => {
      fetch('./../../../../static/json/jdgk1.json').then(res => {
        resolve(res)
      })
    })
  },
  mounthCount() {
    return new Promise(resolve => {
      fetch('./../../../../static/json/jdgk2.json').then(res => {
        resolve(res)
      })
    })
  },
}
