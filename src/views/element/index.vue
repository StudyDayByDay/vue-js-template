<template>
  <div class="element-container">
    <Descrition :title="t('element.title')">
      <template #descrition>
        Vue3-admin-element-template使用的是
        <a href="https://element-plus.gitee.io/#/zh-CN/component/installation" target="_blank"
          >Element-Plus</a
        >
        UI组件库，以下是常用的组件
      </template>
    </Descrition>
    <Descrition :showDesc="false" :title="t('element.btn')" />
    <el-row>
      <el-row>
        <el-button plain>圆角按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
        <el-button type="primary" link>主要按钮</el-button>
        <el-button type="success" link>成功按钮</el-button>
        <el-button type="info" link>信息按钮</el-button>
        <el-button type="warning" link>警告按钮</el-button>
        <el-button type="danger" link>危险按钮</el-button>
      </el-row>
    </el-row>
    <el-row class="row">
      <el-button-group>
        <el-button type="success" :icon="ArrowLeft">上一页</el-button>
        <el-button type="success"
          >下一页<el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
      <el-button-group class="group">
        <el-button type="primary" :icon="Edit" />
        <el-button type="primary" :icon="Share" />
        <el-button type="primary" :icon="Delete" />
      </el-button-group>
    </el-row>
    <Descrition :showDesc="false" :title="t('element.radio')" />
    <el-row class="row">
      <el-radio-group v-model="radio">
        <el-radio :label="3" disabled>备选项</el-radio>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
      <el-radio-group class="group" v-model="radio2">
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group>
    </el-row>
    <Descrition :showDesc="false" :title="t('element.checkBox')" />

    <el-row class="row">
      <el-checkbox v-model="checked1" label="备选项1" disabled></el-checkbox>
      <el-checkbox v-model="checked2" label="备选项1"></el-checkbox>
      <el-checkbox-group class="group" v-model="checkbox">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{
          city
        }}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <Descrition :showDesc="false" :title="t('element.datePicker')" />

    <el-date-picker
      v-model="date"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
    >
    </el-date-picker>
    <Descrition :showDesc="false" :title="t('element.dateTimePicker')" />

    <el-date-picker
      v-model="dateTime"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    >
    </el-date-picker>

    <Descrition :showDesc="false" title="表单" />
    <div>
      <el-radio-group v-model="size" label="size control">
        <el-radio-button label="large">large</el-radio-button>
        <el-radio-button label="default">default</el-radio-button>
        <el-radio-button label="small">small</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="labelPosition" label="position control">
        <el-radio-button label="left">Left</el-radio-button>
        <el-radio-button label="right">Right</el-radio-button>
        <el-radio-button label="top">Top</el-radio-button>
      </el-radio-group>
    </div>
    <br />
    <el-form
      ref="form"
      :model="sizeForm"
      label-width="auto"
      :label-position="labelPosition"
      :size="size"
    >
      <el-form-item label="Activity name">
        <el-input v-model="sizeForm.name" disabled placeholder="123456789"/>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select
          v-model="sizeForm.region"
          placeholder="please select your zone"
          filterable
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="级联选择器">
        <el-cascader v-model="sizeForm.calue" :options="options" />
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="sizeForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="sizeForm.date2"
            label="Pick a time"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="sizeForm.type">
          <el-checkbox-button label="Online activities" name="type" />
          <el-checkbox-button label="Promotion activities" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="sizeForm.resource">
          <el-radio border label="Sponsor" />
          <el-radio border label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
    <Descrition :showDesc="false" title="表格" />
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="date" label="Date" sortable />
      <el-table-column prop="name" label="Name" sortable />
      <el-table-column prop="address" label="Address" sortable />
    </el-table>
    <Descrition :showDesc="false" title="分页" />
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    <Descrition :showDesc="false" title="弹框" />
    <el-button text @click="dialogVisible = true">
      click to open the Dialog
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      :show-close="false"
      width="30%"
    >
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <div :id="titleId" :class="titleClass">This is a custom header!</div>
        <svg-icon name="close" size="16px" class="close" @click="close"/>
      </div>
    </template>
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" style="margin-left: 24px;" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <Descrition :showDesc="false" title="标签页" />
    <el-tabs v-model="activeName">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
    <Descrition :showDesc="false" title="开关" />
    <el-switch v-model="switchValue" />
    <Descrition :showDesc="false" title="时间线" />
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        color="#2879da"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <Descrition :showDesc="false" title="jsx" />
    <Bar/>
    <Lk/>
  </div>
</template>

<script setup>
  import { ArrowLeft, ArrowRight, Delete, Edit, Share } from '@element-plus/icons-vue';
  import Descrition from '@/components/Descrition/index.vue';
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Bar, Lk } from './jsx/title';
  const { t } = useI18n();
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  const radio = ref(3);
  const radio2 = ref('上海');
  const checked1 = ref();
  const checked2 = ref();
  const checkbox = ref(['上海']);
  const date = ref();
  const dateTime = ref();
  const cities = reactive(cityOptions);

  const size = ref('large')
  const labelPosition = ref('right')

  const currentPage4 = ref(4)
  const pageSize4 = ref(100)

  const dialogVisible = ref(false)

  const activeName = ref('first')

  const switchValue = ref(true)

  const activities = [
    {
      content: 'Event start',
      timestamp: '2018-04-15',
    },
    {
      content: 'Approved',
      timestamp: '2018-04-13',
    },
    {
      content: 'Success',
      timestamp: '2018-04-11',
    },
  ]

  const sizeForm = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    calue: [],
  })

  const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

  const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

  function onSubmit() {
    console.log('submit!')
  }

</script>

<style lang="scss" scoped>
  .element-container {
    padding: $base-main-padding;
    background-color: $base-color-white;
    .row {
      margin: 20px 0;
    }
    .group {
      margin: 0 20px;
    }
  }

  .my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    cursor: pointer;
  }
</style>
