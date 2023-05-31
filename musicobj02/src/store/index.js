import { createStore } from 'vuex'

export default createStore({
  state: {
    playlist: [   //音乐播放列表
      {
        name: "断桥残雪",
        id: 167937,
        al: {
          id: 16960,
          name: "断桥残雪",
          pic: 19061133579343590,
          picUrl: "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
          pic_str: "19061133579343591",
        }
      }
    ],
    playCurrentIndex:0,   //当前播放音乐在播放列表中的下标
    lyric:"abc", //保存当前播放音乐的歌词
    isLogin:true
  },
  getters: {
  },
  mutations: {
    setPlayList(state,value){   //定义一个函数用来修改state中播放列表的数据
      state.playlist = value;
    },
    pushPlayList(state,value){   //定义一个函数用来追加数据
      state.playlist.push(value);
    },
    setPlayIndex(state,value){   //定义一个函数用来修改state中播放列表歌曲的下标
      state.playCurrentIndex = value;
    },
    setLyric(state,value){   //定义一个函数用来修改state中播放列表歌曲的歌词
      state.lyric = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
