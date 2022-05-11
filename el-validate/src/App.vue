<template>
  <el-form :model="form" :rules="rules">
    <el-form-item label="标题" prop="value">
      <el-popover trigger="click">
        编辑这个输入框，会触发表单项校验
        <el-input v-model="search" />
        编辑这个输入框，不会触发表单项校验
        <el-input
          v-model="search1"
          :validate-event="false"
        />

        <div slot="reference">
          <el-input v-model="form.value" />
        </div>
      </el-popover>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      form: {
        value: ""
      },

      rules: {
        value: [
          {
            required: true,
            validator(rule, value, callback) {
              console.log("触发校验")
              if (!value) {
                callback(new Error("请填写"))
                return
              }
              callback()
            },
            trigger: "change"
          }
        ]
      },

      search: "",
      search1: ""
    }
  }
}
</script>

<style lang="scss"></style>
