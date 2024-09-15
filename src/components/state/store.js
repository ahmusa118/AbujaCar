import { proxy } from 'valtio';

export const state = proxy({
  backgroundColor:'#000000',
  text: '#ffffff',
  light:false,
  headcolor:"#000000",
  filterColor:'#faf9f6',
  searchcolor:'#808080',
  searchtextcolor:'#ccc'

})