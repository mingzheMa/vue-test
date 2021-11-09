<template>
  <div class="demo-app-main">
    <!-- 自定义切换周 -->
    <div style="marginbottom: 20px">
      <span>这是自定义按钮：</span>
      <button @click="qiehuanZhou('prev')">上一周</button>
      <button @click="qiehuanZhou('next')">下一周</button>
      <button @click="qiehuanZhou('today')">当周</button>
    </div>

    <div style="height: 500px">
      <FullCalendar
        ref="fullCalendar"
        class="demo-app-calendar"
        :options="calendarOptions"
      ></FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import timeGridPlugin from "@fullcalendar/timegrid";
import cnLocale from "@fullcalendar/core/locales/zh-cn";

import moment from "moment";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
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
        height: "100%",
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

        slotDuration: "00:15:00", // 侧边栏时间间隔
        slotLabelInterval: "01:00", // 侧边栏显示间隔
        slotMinTime: "00:00:00", // 侧边栏时间轴初试时间
        slotMaxTime: "24:00:00", // 侧边栏时间轴结束时间
        scrollTime: "08:00:00", // 滚动条默认定位时间

        // 表头加载后钩子
        dayHeaderDidMount(info) {
          const mo = moment(info.el.dataset.date);
          const week = {
            0: "周日",
            1: "周一",
            2: "周二",
            3: "周三",
            4: "周四",
            5: "周五",
            6: "周六",
          };

          const isTodayClass = mo.isSame(new Date(), "day")
            ? "full-calendar__custom-header--is-today"
            : "";

          // 重新设定表头结构
          info.el.innerHTML = `
            <div class="full-calendar__custom-header ${isTodayClass}">
              <div class="full-calendar__custom-header__week">
                ${week[mo.format("d")]}
              </div>
              <div class="full-calendar__custom-header__date">
                ${mo.format("MM/DD")}
              </div>
            </div>
          `;
        },

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
            appendTo: () => document.body, // 弹窗插在body上
            theme: "light", // 主题
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

<style lang="css" scoped>
.demo-app-main {
  padding: 30px;
}

.demo-app-calendar /deep/ .fc-scrollgrid {
  border: 0;
}
.demo-app-calendar /deep/ .fc-scrollgrid-section-header > th {
  border-right-color: rgba(0, 0, 0, 0);
}
.demo-app-calendar /deep/ .fc-scrollgrid-section-body > td {
  border-right-color: rgba(0, 0, 0, 0);
  border-bottom-color: rgba(0, 0, 0, 0);
}

/* 自定义表格头部样式 */
.demo-app-calendar /deep/ .full-calendar__custom-header {
  padding: 16px;
}
.demo-app-calendar /deep/ .full-calendar__custom-header--is-today > div {
  /* 当天 */
  color: #0ea67c !important;
}
.demo-app-calendar /deep/ .full-calendar__custom-header__week {
  /* 周 */
  text-align: left;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
.demo-app-calendar /deep/ .full-calendar__custom-header__date {
  /* 日期 */
  text-align: left;
  font-size: 18px;
  font-family: "D-DIN-Bold, D-DIN";
  font-weight: bold;
  color: #333;
}

/* 设置表格行高 */
.demo-app-calendar /deep/ .fc-timegrid-slot {
  height: inherit;
}
.demo-app-calendar /deep/ .fc-timegrid-slot-label-frame {
  /* 设置表格第一列行高 */
  height: 12px;
  font-size: 14px;
  color: #999;
  /* padding: 0 16px; */
}
.demo-app-calendar /deep/ .fc-timegrid-slot:empty:before {
  /* 设置表格后序列行高 */
  display: block;
  height: 12px;
}

/* 当天高亮列背景 */
.demo-app-calendar /deep/ .fc-timegrid-col.fc-day-today {
  background: rgba(14, 166, 124, 0.03);
}

/* 隐藏虚线 */
.demo-app-calendar /deep/ .fc-timegrid-slot-minor {
  border-top-style: none;
}

/* 事件元素样式 */
.demo-app-calendar /deep/ .width-all {
  left: 0% !important;
  right: 0% !important;
  z-index: 99999 !important;
}

.demo-app-calendar /deep/ .base {
  border-radius: 0px;
  border: none;
}

.demo-app-calendar /deep/ .warning {
  background: #f8ecda;
  border-left: 3px solid #e6a23c;
}

.demo-app-calendar /deep/ .success {
  background: #e4fad1;
  border-left: 3px solid #67c23a;
}

.demo-app-calendar /deep/ .danger {
  background: #f9e3e2;
  border-left: 3px solid #f56c6c;
}

.demo-app-calendar /deep/ .info {
  background: #e9e9eb;
  border-left: 3px solid #909399;
}
</style>
