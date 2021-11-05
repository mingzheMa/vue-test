<template>
  <div class="demo-app-main">
    <!-- 自定义切换周 -->
    <div style="marginbottom: 20px">
      <span>这是自定义按钮：</span>
      <button @click="qiehuanZhou('prev')">上一周</button>
      <button @click="qiehuanZhou('next')">下一周</button>
      <button @click="qiehuanZhou('today')">当周</button>
    </div>

    <FullCalendar
      ref="fullCalendar"
      class="demo-app-calendar"
      :options="calendarOptions"
    ></FullCalendar>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import cnLocale from "@fullcalendar/core/locales/zh-cn";

import moment from "moment";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { comp2Dom } from "./util";
import Tooltip from "./Tooltip.vue";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },

  data: function () {
    return {
      calendarOptions: {
        plugins: [
          timeGridPlugin, // timeGridWeek插件
        ],
        allDaySlot: false, // 显示all-day
        headerToolbar: false, // 显示头部工具栏
        initialView: "timeGridWeek", // 视图
        initialEvents: [
          {
            id: 100,
            title: "测试",
            classNames: "base warning",
            textColor: "#333",
            start: Date.now(),
            end: Date.now() + 3600000 * 3,
            extendedProps: {
              时间: "07:00",
              地点: "现场",
              类型: "HR面试",
              职位: "前端开发",
              候选人: "马明哲",
              面试官: "你、我、他、她、它",
            },
          },
          {
            id: 101,
            title: "测试2",
            classNames: "base danger",
            textColor: "#333",
            start: Date.now(),
            end: Date.now() + 3600000 * 2,
            extendedProps: {
              时间: "07:00",
              地点: "现场2",
              类型: "HR面试2",
              职位: "前端开发2",
              候选人: "马明哲2",
              面试官: "你、我、他、她、它",
            },
          },
          {
            id: 102,
            title: "测试3",
            classNames: "base info",
            textColor: "#333",
            start: Date.now(),
            end: Date.now() + 3600000 * 1,
            extendedProps: {
              时间: "07:00",
              地点: "现场3",
              类型: "HR面试3",
              职位: "前端开发3",
              候选人: "马明哲3",
              面试官: "你、我、他、她、它",
            },
          },
          {
            id: 103,
            title: "测试4",
            classNames: "base success",
            textColor: "#333",
            start: Date.now(),
            end: Date.now() + 3600000 * 4,
            extendedProps: {
              时间: "07:00",
              地点: "现场4",
              类型: "HR面试4",
              职位: "前端开发4",
              候选人: "马明哲4",
              面试官: "你、我、他、她、它",
            },
          },
        ], // 视图事件（数据）
        slotEventOverlap: false, // 视图事件互相重叠
        firstDay: 1, // 周起始日（1 = 周一）
        locale: cnLocale, // 语言

        dayHeaderFormat: {
          weekday: "short",
          month: "numeric",
          day: "numeric",
          omitCommas: true,
        }, // 顶部表头format
        slotDuration: "00:15:00", // 侧边栏时间间隔
        slotLabelInterval: "01:00", // 侧边栏显示间隔
        slotMinTime: "00:00:00", // 侧边栏时间轴初试时间
        slotMaxTime: "24:00:00", // 侧边栏时间轴结束时间
        scrollTime: "08:00:00", // 滚动条默认定位时间
        // 侧边栏format
        slotLabelFormat(info) {
          const date = moment("00:00:00", "HH:mm")
            .add(info.date.hour, "hours")
            .add(info.date.minute, "minutes");
          return date.format("HH:mm");
        },

        // 视图事件鼠标移入
        eventMouseEnter(info) {
          info.el.parentNode.classList.add("width-all");
        },

        // 视图事件鼠标移出
        eventMouseLeave(info) {
          info.el.parentNode.classList.remove("width-all");
        },

        // 视图事件挂载调用
        eventDidMount: function (info) {
          info.el.parentNode.style.transition = "0.3s all";
          tippy(info.el.parentNode, {
            content: comp2Dom(Tooltip, {
              props: {
                data: info.event.extendedProps,
              },
            }),
            allowHTML: true, // 使用html
            interactive: true, // 有交互（鼠标移入弹框操作）
            arrow: false, // 显示弹框箭头
            delay: [300, null], // [隐藏延时, 显示延时]
          });
        },
      },
    };
  },

  methods: {
    // 切换周
    qiehuanZhou(funcName) {
      const calendar = this.$refs.fullCalendar.getApi();

      calendar[funcName]();
    },
  },
};
</script>

<style lang="css">
.demo-app-main {
  padding: 30px;
}

.width-all {
  left: 0% !important;
  right: 0% !important;
  z-index: 99999 !important;
}

.base {
  border-radius: 0px;
  border: none;
}

.base {
  border-radius: 0px;
  border: none;
}

.warning {
  background: #f8ecda;
  border-left: 3px solid #e6a23c;
}

.success {
  background: #e4fad1;
  border-left: 3px solid #67c23a;
}

.danger {
  background: #f9e3e2;
  border-left: 3px solid #f56c6c;
}

.info {
  background: #e9e9eb;
  border-left: 3px solid #909399;
}
</style>
