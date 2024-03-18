<template>
  <div class="about-container">
    <div class="warpper">
      <van-dropdown-menu>
        <van-dropdown-item
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :title="option.name"
          @change="onOptionChange"
        />
      </van-dropdown-menu>
      <van-table :columns="columns" :data="testerList" />
    </div>
  </div>
</template>

<script>
// 请求接口
import { ceeTesterList, ceeTesterWorkType } from '@/api/ceeTesterList.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      options: [],
      selectedOption: null,
      testerList: [],
      columns: [
        { title: 'ID', prop: 'id' },
        { title: 'Name', prop: 'name' },
        { title: 'Work Type', prop: 'workType' },
        { title: 'Status', prop: 'status' }
      ]
    }
  },
  async created() {
    this.fetchOptions()
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted() {},
  methods: {
    async fetchOptions() {
      try {
        ceeTesterWorkType().then(res => {
          this.options = res.data
        })
      } catch (error) {
        console.error(error)
      }
    },
    onOptionChange(value) {
      this.selectedOption = value
      this.getTesterList(value)
    },
    async getTesterList(value) {
      try {
        ceeTesterList({ workType: value }).then(res => {
          this.testerList = res.data.map(item => {
            return {
              id: item.id,
              name: item.name,
              workType: item.workType,
              status: item.status
            }
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
.about-container {
  /* 你的命名空间 */
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  .warpper {
    padding: 50px 12px 12px 12px;
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #666;
      font-size: 14px;
      .demo-home__title {
        margin: 0 0 6px;
        font-size: 32px;
        .demo-home__title img,
        .demo-home__title span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .item {
        font-size: 14px;
        line-height: 34px;
        a {
          text-decoration: underline;
        }
        .van-button {
          /* vant-ui 元素*/
          background: #ff5500;
        }
      }

      .logo {
        width: 120px;
        height: 120px;
        background: url($cdn + '/weapp/logo.png') center / contain no-repeat;
      }
      .wechat {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
