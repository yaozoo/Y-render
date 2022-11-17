/*
 * @Author: luyao
 * @Date: 2022-06-28 14:25:42
 * @LastEditTime: 2022-11-17 17:12:41
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsForm/index.tsx
 */

import { defineComponent, ref, reactive, computed, nextTick, Fragment } from "vue";
import dayjs from "dayjs";
import './index.less'
import { Bottom, Top } from "@element-plus/icons-vue";

export default defineComponent({
    props: {
        ref: {
            type: String,
            default: "form",
        },

        // 搜索项
        searchForm: {
            type: Array,
            default: [],
        },
        // 操作按钮组
        searchHandle: {
            type: Array,
            default: () => [],
        },

        // 搜索项对应字段
        searchData: {
            type: Object,
            default: {},
        },
        // 设置表格高度方法
        containerEle: Object,
        allDisabled: {
            type: Boolean,
        },
        formConfig: {
            type: Object,
            // default: () => {
            //   return {
            //     size: "small",
            //     inline: true,
            //     isHandle: true,
            //     formItemWidth: "auto",
            //     labelWidth: "110px",
            //     hasReset: true,
            //     hasSearch: true,
            //   };
            // },
        },
    },
    emits: ["getFormRef", "handleReset", "handleSearch"],
    setup(props, { emit, slots }) {
        const dbsFormRef: any = ref(null);
        const state = reactive({
            searchBtnShow: true,
            defaultTime: [
                new Date(2000, 1, 1, 0, 0, 0),
                new Date(2000, 2, 1, 23, 59, 59),
            ],
            searchFormList: computed(() => {
                return props.searchForm.filter((item: any) => {
                    return !item.isHidden;
                });
            }),
            formConfig: computed(() => {
                return {
                    ...{
                        size: "small",
                        inline: true,
                        isHandle: true,
                        formItemWidth: "auto",
                        labelWidth: "110px",
                        hasReset: true,
                        hasSearch: true,
                        isShowFilter: true
                    } as any,
                    ...props.formConfig,
                };
            }),
            open: true,
        });


        function isOpen() {
            state.open = !state.open;
        }
        function numberRanger(ev: any, props: any) {
            console.log(ev, props);
        }
        emit("getFormRef", dbsFormRef);

        function resetFun() {
            dbsFormRef.value.resetFields();
        }


        function validate() {
            return new Promise((resolve, reject) => {
                dbsFormRef.value.validate((valid: unknown) => {
                    resolve(valid);
                });
            });
        }

        function setDate(val: any, prop: any) {
            if (val) {
                props.searchData[prop] = [
                    dayjs(val[0]).format("YYYY-MM-DD HH:mm:ss"),
                    dayjs(val[1]).format("YYYY-MM-DD HH:mm:ss"),
                ];
            } else {
                props.searchData[prop] = null;
            }
        }

        function reset() {
            let pageSize =
                props.searchData.hasOwnProperty("pageSize") && props.searchData.pageSize;
            Object.keys(props.searchData).forEach((item, index) => {
                props.searchData[item] = null;
            });
            if (props.searchData.hasOwnProperty("pageSize")) {
                props.searchData.pageSize = pageSize;
            }
            if (props.searchData.hasOwnProperty("pageNum")) {
                props.searchData.pageNum = 1;
            }
            emit("handleReset");
        }

        function search() {
            Object.keys(props.searchData).forEach((item, index) => {
                if (props.searchData[item] == "") {
                    props.searchData[item] = null;
                }
            });
            emit("handleSearch");
        }

        function showAllSearch() {
            nextTick(() => {
                //收起/展开操作按钮
                let switchBtnDom = document.querySelector(".form-move-search");
                // 搜索项form表单
                let searchFormDom = document.querySelector(".search-form-box");
                let diffHeight = null;
                if (switchBtnDom && searchFormDom) {
                    diffHeight =
                        switchBtnDom.getBoundingClientRect().top -
                        searchFormDom.getBoundingClientRect().top

                    state.searchBtnShow = diffHeight > 10
                }

            });
        }
        showAllSearch();
        return () => (

            <el-form
                class={
                    [
                        !!(state.formConfig.rules && state.formConfig.rules.length > 0)
                            ? 'has-rules'
                            : 'not-rules',
                        'search-form-box'
                    ]
                }
                ref="dbsFormRef"
                model={props.searchData}
                size={state.formConfig.size}
                inline={state.formConfig.inline}
                label-width={state.formConfig.labelWidth}
                rules={state.formConfig.rules || []}
                disabled={props.allDisabled}
                onKeydown={(e: any) => {
                    e.keyCode == 13 && search()
                }}
            >
                {
                    state.searchFormList.map((item: any, index) => {
                        return (!item.isShow ||
                            props.searchData[item.isShow.prop] == item.isShow ||
                            item.isShow === true
                        ) && (!item.hasOwnProperty('slot') ? <el-form-item
                            class={[item.className, !state.open && index > 3 ? 'hide-item' : '']}
                            label={item.label}
                            key={item.prop}
                            style={{ 'width': state.formConfig.formItemWidth }}
                            prop={props.searchData.hasOwnProperty(item.prop) ? item.prop : ''}
                            rules={item.rules}
                        >
                            {/*  输入框  */}
                            {item.type === 'Input' && <el-input
                                clearable
                                disabled={item.disable}
                                type={item.inputType || 'text'}
                                v-model_trim={props.searchData[item.prop]}
                                placeholder={item.placeholder}
                                maxlength={item.maxlength}
                                minlength={item.minlength}
                                prefix-Icon={item.prefixIcon || ''}
                                style={{ width: item.width || '180px' }}
                                onKeyup={item.keyup && item.keyup(props.searchData[item.prop])}
                            />}

                            {/* 数字 */}
                            {item.type === 'InputNumber' && <el-input-number
                                v-model={props.searchData[item.prop]}
                                placeholder={item.placeholder}
                                disabled={item.disable}
                                // controls-position="right"
                                precision={item.precision}
                                style={{ textAlign: item.textAlign, width: item.width || '180px' }}
                                onKeyup={item.keyup && item.keyup(props.searchData[item.prop])}
                                min={item.min}
                                max={item.max}
                            />}

                            {/* 密码输入框  */}
                            {item.type === 'InputPwd' && <el-input
                                clearable
                                disabled={item.disable}
                                show-password
                                type={item.inputType || 'text'}
                                v-model_trim={props.searchData[item.prop]}
                                placeholder={item.placeholder}
                                prefix-Icon={item.prefixIcon || ''}
                                style={{ width: item.width || '180px' }}
                                onKeyup={item.keyup && item.keyup(props.searchData[item.prop])}
                            />}


                            {/*  文本域  */}
                            {item.type === 'Textarea' && <el-input
                                clearable
                                type="textarea"
                                disabled={item.disable}

                                v-model={props.searchData[item.prop]}
                                placeholder={item.placeholder}
                                style={{ width: item.width || '180px' }}
                                rows={item.rows || 1}
                                show-word-limit={item.showWordLimit}
                                maxlength={item.maxlength}
                            />}

                            {/* <!-- 下拉框 --> */}
                            {item.type === 'Select' && <el-select
                                disabled={item.disable}
                                clearable={item.clearable === false ? false : true}
                                filterable={item.filterable}
                                multiple={item.multiple}
                                placeholder={item.placeholder}
                                v-model={props.searchData[item.prop]}
                                style={{ width: item.width || '180px' }}
                                onChange={item.change && item.change(props.searchData[item.prop])}
                            >
                                {
                                    (item.options || []).map((op: any) => {
                                        return <el-option
                                            label={op[item.itemName || 'value']}
                                            value={op[item.itemValue || 'key']}
                                            key={op[item.itemValue || 'key']}
                                        ></el-option>
                                    })
                                }
                            </el-select>}
                            {/* 开关  */}
                            {item.type === 'Switch' && <el-switch
                                v-model={props.searchData[item.prop]}
                            ></el-switch>
                            }

                            {/* 级联选择器  */}
                            {item.type === 'Cascader' && <el-cascader
                                clearable
                                v-model={props.searchData[item.prop]}
                                options={item.options}
                                props={item.props}
                                style={{ width: item.width || '180px' }}
                                onChange={item.change && item.change(props.searchData[item.prop])}
                                placeholder={item.placeholder}
                            />}

                            {/* 单选 */}
                            {item.type === 'Radio' && <el-radio-group
                                v-model={props.searchData[item.prop]}
                            >
                                {
                                    item.radios.map((ra: any) => {
                                        return <el-radio label={ra.value} key={ra.value}>{
                                            ra.label
                                        }</el-radio>
                                    })
                                }
                            </el-radio-group>}


                            {/* 复选框 */}
                            {item.type === 'Checkbox' && <el-checkbox-group
                                class={item.className}
                                style={{ width: item.width || '180px' }}
                                v-model={props.searchData[item.prop]}
                            >
                                {
                                    item.checkboxs.map((ch: any) => {
                                        return <el-checkbox
                                            label={ch.value}
                                            key={ch.value}
                                        >{ch.label}</el-checkbox>
                                    })
                                }
                            </el-checkbox-group>}
                            {/* 日期 */}
                            {
                                item.type === 'Date' && <el-date-picker
                                    type="date"
                                    disabled={item.disable}
                                    placeholder={item.placeholder || '选择日期'}
                                    v-model={props.searchData[item.prop]}
                                    format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD"
                                    style={{ width: item.width || '180px' }}
                                    clearable={!!item.clearable}
                                ></el-date-picker>
                            }

                            {/* 日期范围  */}
                            {
                                item.type === 'Daterange' && <el-date-picker
                                    v-model={props.searchData[item.prop]}
                                    type="daterange"
                                    disabled={item.disable}
                                    start-placeholder={item.startPlaceholder || '开始日期'}
                                    end-placeholder={item.endPlaceholder || '结束日期'}
                                    range-separator=" - "
                                    disabled-date={item.disabledDate}
                                ></el-date-picker>
                            }
                            {/* 时间  */}
                            {
                                item.type === 'Time' && <el-time-select
                                    disabled={item.disable}
                                    placeholder={item.placeholder || '选择时间'}
                                    v-model={props.searchData[item.prop]}
                                    type=""
                                ></el-time-select>
                            }
                            {/* 日期时间  */}
                            {
                                item.type === 'DateTime' && <el-date-picker
                                    placeholder={item.placeholder || '选择日期'}
                                    type="datetime"
                                    v-model={props.searchData[item.prop]}
                                    disabled={item.disable}
                                    disabled-date={item.disabledDate}
                                ></el-date-picker>
                            }
                            {/*  日期时间范围 */}
                            {item.type === 'Datetimerange' && <el-date-picker
                                v-model={props.searchData[item.prop]}
                                type="datetimerange"
                                start-placeholder={item.startPlaceholder || '开始日期'}
                                end-placeholder={item.endPlaceholder || '结束日期'}
                                placeholder={item.placeholder}
                                default-time={state.defaultTime}
                                disabled-date={item.disabledDate}
                                clearable={item.clearable}
                                onChange={(v: any) => setDate(v, item.prop)}
                            >
                            </el-date-picker>}
                        </el-form-item> : <el-form-item
                            class={[item.className, !state.open && index > 4 ? 'hide-item' : '']}
                            label={item.label}
                            key={item.prop}
                            style={{ 'width': state.formConfig.formItemWidth }}
                            prop={props.searchData.hasOwnProperty(item.prop) ? item.prop : ''}
                            rules={item.rules}
                            v-slots={{ default: item.slot ? slots[item.slot] : null }}
                        />)

                    })
                }

                {
                    !!state.formConfig.isHandle && <div class="btn-box" >
                        {
                            (props.searchHandle || []).map((item: any) => {
                                let cFun: any;
                                if (item.handle == 'string') {
                                    cFun = new Function("return " + item.handle)
                                }
                                return (!item.slot && <el-button disabled={item.controlClick || false} type={item.type} onClick={typeof item.handle == 'string' ? '' : item.handle}
                                > {item.label}</el-button>)
                            })
                        }
                        {
                            state.formConfig.hasSearch && <el-button
                                onClick={search}
                                size={state.formConfig.size}
                                type="primary"
                                style="width: 80px"
                            >查询</el-button>
                        }
                        {
                            state.formConfig.hasReset && <el-button
                                onClick={reset}
                                size={state.formConfig.size}
                                style="width: 80px"
                            >重置</el-button>
                        }
                        {
                            state.formConfig.isShowFilter && state.searchBtnShow && <span
                                onClick={isOpen}
                                class="form-move-search">
                                {
                                    state.open ? <el-icon size={16}><Top /></el-icon> : <el-icon size={16}><Bottom /></el-icon>
                                }
                                {state.open ? "收起筛选" : "展开筛选"}
                            </span>
                        }
                    </div>
                }
            </el-form>
        )
    }
})