<template>
    <div class="playController">
        <div class="left">
            <img :src="playlist[playCurrentIndex].al.picUrl" alt="" @click="show = !show">
            <div class="content">
                <div class="title">{{ playlist[playCurrentIndex].name }}</div>
                <div class="tips">横划可以切换上下首</div>
            </div>
        </div>
        <div class="right">
            <svg v-if="abc" class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg v-else class="icon" aria-hidden="true" @click="play">
                <use xlink:href="#icon-iconstop"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao1"></use>
            </svg>
        </div>
        <!-- 歌曲详情 -->
        <play-music v-show="show" :abc="abc" :play="play" :playDetail="playlist[playCurrentIndex]"
            @back="show = !show"></play-music>
        <!-- 如何获取播放歌曲的mps地址 -->
        <!-- controls audio标签属性，一般不显示 -->
        <!-- audio paly（）播放音乐 pause（）暂停音乐 -->
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import playMusic from "@/components/PlayMusic.vue"
import { getLyric } from '@/api';
import store from '@/store';
export default {
    name: "playcontroller",
    data() {
        return {
            abc: true,  //当前音乐是否处于暂停状态
            show: false //歌曲详情是否显示
        }
    },
    components: {
        playMusic
    },
   async mounted(){
        var res = await getLyric(this.playlist[this.playCurrentIndex].id);
        store.commit("setLyric",res.data.lrc.lyric);
    },
    async updated(){
        var res = await getLyric(this.playlist[this.playCurrentIndex].id);
        store.commit("setLyric",res.data.lrc.lyric);
    },
     computed: {
        ...mapState(["playlist", "playCurrentIndex"]) //获取正在播放曲列表，以及下标
    },
    methods: {
        play() {
            if (this.$refs.audio.paused) {  //当前audio处于暂停状态
                this.$refs.audio.play();  //this.$refs.audio 获取audio标签
                this.abc = false;
            }
            else {  //当前audio处于播放状态
                this.$refs.audio.pause();
                this.abc = true;
            }
        }
        // kai(){
        //     // this.$refs.audio获取audio标签
        //     this.$refs.audio.play();
        // },
        // ting(){
        //     this.$refs.audio.pause();
        // }
    }
}
</script>

<style lang="less">
.playController {
    background: #fff;
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;

    .left {
        display: flex;
        padding: 0 0.2rem;

        img {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
        }

        .content {
            padding: 0 0.2rem;

            .tips {
                font-size: 0.2rem;
                color: #999;
            }
        }
    }

    .right {
        .icon {
            width: 0.4rem;
            height: 0.4rem;
            margin: 0 0.2rem;
        }
    }
}
</style>