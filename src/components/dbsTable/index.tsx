/*
 * @Author: luyao
 * @Date: 2021-10-06 15:54:58
 * @LastEditTime: 2022-11-17 17:13:06
 * @Description:
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsTable/index.tsx
 */
import { defineComponent, Fragment, onMounted, ref } from "vue-demi";
import SortableJs from "sortablejs";
import ColumnRender from "./columnRender";
export default defineComponent({
    props: {
        columns: {
            // 表头数据  文案和绑定值，以及需要特殊处理的slot
            type: Array,
            default: () => [],
        },

        data: {
            type: Array, // 后台数据
            default: () => [],
        },
        totalNum: {
            type: Number,
            default: () => 0,
        },
        pageNum: {
            type: Number,
            default: () => 1,
        },
        pageSize: {
            type: Number,
            default: () => 20,
        },
        // params: {
        //   // 分页数据
        //   type: Object,
        //   default: () => {
        //     return {
        //       pageNum: 1,
        //       pageSize: 20,
        //     };
        //   },
        // },
        loading: {
            type: Boolean,
        },

        configFlag: {
            // 配置  其他table配置依次添加
            type: Object,
            default: () => {
                return {
                    needPage: true, // 是否需要分页
                    selection: false, // 是否需要多选
                    index: false, // 是否需要序号
                    border: true,
                    tableAlign: "left",
                };
            },
        },
        // 是否需要分页
        needPage: {
            type: Boolean,
            default: true,
        },
        // 是否需要index
        needIndex: {
            type: Boolean,
            default: false,
        },
        // 是否需要自适应屏幕高度
        autoHeight: {
            type: Boolean,
            default: false,
        },
        tableHeight: {
            // 可以监听屏幕高度获取。
            // 高度
            type: String,
            // default: () => "100%",
        },
        tableMaxHeight: {
            // 可以监听屏幕高度获取。
            // 高度
            type: String,
            // default: () => "100%",
        },
        headerCellStyle: {
            type: Object,
            default: () => {
                return {
                    color: "#333",
                    backgroundColor: "#e1e1e1",
                    // lineHeight: "18px",
                };
            },
        },
        cellStyle: {
            type: Object,
            default: () => {
                return {
                    color: "",
                    backgroundColor: "",
                    // lineHeight: "18px",
                };
            },
        },
        highlightCurrentRow: {
            type: Boolean,
            default: true,
        },
        selecTableFun: {
            type: Function,
            default: () => {
                return true;
            },
        },
        objectSpanMethod: {
            type: Function,
            default: () => {
                return true;
            },
        },
        key: {
            type: String,
            default: () => {
                return "";
            },
        },
        rowKey: {
            type: String,
            default: () => {
                return "";
            },
        },
        tableRowClassName: {
            type: Function,
        },
        dragRow: {
            type: Boolean,
            default: false,
        },
        cusClass: {
            type: String,
            default: () => {
                return "";
            },
        },
        dragBtn: {
            type: String,
            default: () => {
                return "";
            },
        },
        class: {
            type: String,
            default: () => {
                return "";
            },
        }
    },
    emits: [
        "getTableRef",
        "handlePageChange",
        "handleSelectionChange",
        "handleSortChange",
        "handleCurrentChange",
        "cellClick",
        "rowDblclick",
        "dragChangeData",
    ],
    setup(props, { emit, slots }: any) {
        let timer: any = null;
        const tableRef = ref();
        let sortable: any = "";
        let tableHeight: any = ref(props.tableHeight);
        emit("getTableRef", tableRef);
        // 设置条数
        function sizeChange(pageSize: any) {
            console.log("设置条数:", pageSize);
            emit("handlePageChange", { pageSize: pageSize });
        }

        // 翻页
        function currentChange(pageNum: any) {
            console.log("翻页:", pageNum);
            emit("handlePageChange", { pageNum: pageNum });
        }
        function handleCurrentChange(row: any) {
            emit("handleCurrentChange", row);
        }

        // 多选
        function handleSelectionChange(rows: any) {
            emit("handleSelectionChange", rows);
        }
        // 排序
        function sortChange(item: { order: string; prop: string }) {
            emit("handleSortChange", { order: item.order, prop: item.prop });
        }
        // 点击单元格
        function cellClickFun(row: any, column: any) {
            emit("cellClick", row, column);
        }

        function rowDblclickFun(row: any, column: any, event: any) {
            emit("rowDblclick", row, column, event);
        }
        function setHeight() {
            setTimeout(() => {
                let dom = document.querySelector(".dbs-table");
                if (dom) {
                    let th = window.innerHeight - dom?.getBoundingClientRect().top - 40;
                    tableHeight.value = th;
                    // console.log(tableHeight.value, '  tableHeight.value ');
                }
            }, 500);
        }

        function rowDrop() {
            let tbody: any = "";
            let dragData: any = [];
            if (props.cusClass) {
                tbody = document.querySelector(
                    `.${props.cusClass} .el-table__body-wrapper tbody`
                );
            } else {
                tbody = document.querySelector(`.el-table__body-wrapper tbody`);
            }

            if (!tbody) return;
            dragData = props.data;
            sortable = SortableJs.create(tbody, {
                animation: 150,
                handle: props.dragBtn,
                onEnd({ newIndex, oldIndex }: any) {
                    let currRow = dragData.splice(oldIndex, 1)[0];
                    dragData.splice(newIndex, 0, currRow);
                    emit("dragChangeData", dragData);
                },
            });
        }
        onMounted(() => {
            !props.tableMaxHeight && props.autoHeight && setHeight();
            window.addEventListener("resize", (e) => {
                !props.tableMaxHeight && props.autoHeight && setHeight();
            });
            props.dragRow && rowDrop();
        });

        return () => (
            <Fragment>
                <div class="PublicTable">
                    <el-table
                        v-loading={props.loading}
                        ref="tableRef"
                        class="dbs-table"
                        border={props.configFlag.border}
                        header-cell-style={props.headerCellStyle}
                        cell-style={props.cellStyle}
                        data={props.data}
                        max-height={props.tableMaxHeight}
                        height={tableHeight.value}
                        highlight-current-row={props.highlightCurrentRow}
                        span-method={props.objectSpanMethod}
                        key={props.key}
                        onSortChange={sortChange}
                        onCurrentChange={handleCurrentChange}
                        onSelectionChange={handleSelectionChange}
                        onCellClick={cellClickFun}
                        onRowDblclick={rowDblclickFun}
                        row-class-name={props.tableRowClassName}
                        row-key={props.rowKey}
                    >
                        {/* 选择 */}
                        {props.configFlag.selection && (
                            <el-table-column
                                selectable={props.selecTableFun}
                                align="center"
                                width="40"
                                type="selection"
                                fixed="left"
                            />
                        )}

                        {/* 序号列  */}
                        {(props.needIndex || props.configFlag.index) && (
                            <el-table-column
                                align="center"
                                width="100"
                                type="index"
                                index={1}
                                label={props.configFlag.indexName || "序号"}
                            />
                        )}
                        {/* 行 */}
                        {props.columns.map((item: any, index) => {
                            return (item.hasOwnProperty('show') && !!item.show || !item.hasOwnProperty('show')) && <ColumnRender item={item} parentSlots={slots} />;
                        })}
                    </el-table>
                    {(props.needPage || props.configFlag.pagination) && (
                        <el-pagination
                            small
                            background
                            style="margin-top: 3px;background: #fff;padding: 3px 0;float: right;width: 100%;justify-content: flex-end;"
                            layout={"total, sizes, prev, pager, next"}
                            onSizeChange={sizeChange}
                            onCurrentChange={currentChange}
                            page-sizes={[10, 20, 30, 50, 100]}
                            page-size={props.pageSize}
                            current-page={props.pageNum}
                            total={props.totalNum}
                        />
                    )}
                </div>

            </Fragment>
        );
    },
});
