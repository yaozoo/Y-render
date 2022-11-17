/*
 * @Author: luyao
 * @Date: 2022-06-22 18:38:25
 * @LastEditTime: 2022-11-17 17:12:48
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsTable/columnRender.tsx
 */

import { defineComponent } from "vue";

let ColumnRender = defineComponent({
    name: 'ColumnRender',
    props: {
        item: {
            type: Object,
            default: () => { },
        },
        parentSlots: {
            type: Object,
            default: () => { },
        }
    },
    setup(props, { emit, slots }: any) {
        const allSlots = (item: any) => {
            return {
                default: ({ row, column, $index }: any) => {
                    if (!!item.render) {
                        return item.render(row, $index)
                    }
                    return item.slot && props.parentSlots[item.slot] ? props.parentSlots[item.slot]({ scope: { row, column, $index } }) : null
                },
                header: ({ column, $index }: any) => {
                    if (item.headerSlot) {
                        return item.headerSlot && props.parentSlots[item.headerSlot] ? props.parentSlots[item.headerSlot]({ scope: { column, $index } }) : null
                    } else {
                        return item.title
                    }
                }

            }
        }

        const handleChildColumn = (childList: any) => {
            let children: any = [];
            childList.map((child: any) => {
                if (child.children != undefined && child.children.length > 0) {
                    children.push(<el-table-column show-overflow-tooltip={child.tooltip || false}
                        label={child.label || child.title}
                        align={child.align || 'left'}
                        header-align={child.align || 'left'}
                    >
                        {handleChildColumn(child.children)}
                    </el-table-column>)
                } else {
                    children.push(
                        <el-table-column show-overflow-tooltip={child.tooltip || false}
                            key={child.key}
                            width={child.width || ''}
                            height={child.height || ''}
                            max-height={child.maxHeight || ''}
                            min-width={child.minWidth || ''}
                            prop={child.key}
                            label={child.label || child.title}
                            align={child.align || 'left'}
                            sortable={child.sortable}
                            sort-method={child.sortMethod}
                            header-align={child.align || 'left'}
                            fixed={child.fixed}
                            v-slots={allSlots(child)}
                        >
                        </el-table-column>)
                }
            });
            return children;
        };
        return () => (
            <el-table-column
                show-overflow-tooltip={props.item.tooltip || false}
                key={props.item.key}
                width={props.item.width || ''}
                height={props.item.height || ''}
                max-height={props.item.maxHeight || ''}
                min-width={props.item.minWidth || ''}
                prop={props.item.key}
                label={props.item.label || props.item.title}
                align={props.item.align || 'left'}
                sortable={props.item.sortable}
                sort-method={props.item.sortMethod}
                header-align={props.item.align || 'left'}
                fixed={props.item.fixed}
                v-slots={!!!props.item.children && allSlots(props.item)}
            >
                {!!props.item.children && handleChildColumn(props.item.children)}
            </el-table-column>
        )
    },
})

export default ColumnRender;
