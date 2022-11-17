/*
 * @Author: luyao
 * @Date: 2022-06-22 18:38:25
 * @LastEditTime: 2022-11-17 17:12:53
 * @Description: 
 * @LastEditors: luyao
 * @FilePath: /y-render/src/components/dbsTable/columnRender1.tsx
 */


import { defineComponent, Fragment } from "vue";


let ColumnRender = defineComponent({
    name: 'ColumnRender',
    props: {
        item: {
            type: Object,
            default: () => { },
        },
        columnIndex: {
            type: String,
            default: "",
        },
        allSlots: {
            type: Object,
        }
    },
    setup(props, { emit, slots }: any) {
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
                v-slots={props.allSlots}
            />
        )
    },
})

export default ColumnRender;
