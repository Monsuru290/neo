import {default as BaseToolbar} from '../../container/Toolbar.mjs';

/**
 * @class Neo.table.header.Toolbar
 * @extends Neo.container.Toolbar
 */
class Toolbar extends BaseToolbar {
    static getConfig() {return {
        /**
         * @member {String} className='Neo.table.header.Toolbar'
         * @private
         */
        className: 'Neo.table.header.Toolbar',
        /**
         * @member {String} ntype='table-header-toolbar'
         * @private
         */
        ntype: 'table-header-toolbar',
        /**
         * @member {Array} cls=['table-header-toolbar']
         */
        cls: ['table-header-toolbar'],
        /**
         * @member {String} layout='base'
         */
        layout: 'base',
        /**
         * @member {Object} itemDefaults={ntype : 'table-header-button'}
         */
        itemDefaults: {
            ntype : 'table-header-button'
        },
        /**
         * @member {Object} _vdom={tag: 'thead',cn : [{tag: 'tr',cn : []}]}
         */
        _vdom: {
            tag: 'thead',
            cn : [{
                tag: 'tr',
                cn : []
            }]
        }
    }}

    /**
     *
     * @param {String} dock
     * @returns {String} layoutConfig
     * @override
     */
    getLayoutConfig(dock) {
        return 'base';
    }

    /**
     * Specify a different vdom items root if needed (useful in case this container uses a wrapper node).
     * @returns {Object} The new vdom items root
     */
    getVdomItemsRoot() {
        return this.vdom.cn[0].cn;
    }

    /**
     * Specify a different vdom root if needed to apply the top level style attributes on a different level.
     * Make sure to use getVnodeRoot() as well, to keep the vdom & vnode trees in sync.
     * @returns {Object} The new vdom root
     */
    getVdomRoot() {
        return this.vdom.cn[0];
    }

    /**
     * Specify a different vnode root if needed to apply the top level style attributes on a different level.
     * Make sure to use getVdomRoot() as well, to keep the vdom & vnode trees in sync.
     * @returns {Object} The new vnode root
     */
    getVnodeRoot() {
        return this.vnode.childNodes[0];
    }

    /**
     *
     */
    createItems() {
        super.createItems();

        let me             = this,
            dockLeftWidth  = 0,
            dockRightWidth = 0,
            items          = me.items,
            len            = items.length,
            vdom           = me.vdom,
            style;

        items.forEach((item, index) => {
            if (item.dock) {
                item.vdom.cls = ['neo-locked'];
                style = item.wrapperStyle;

                if (item.dock === 'left') {
                    style.left = dockLeftWidth + 'px';
                }

                item.wrapperStyle = style;

                dockLeftWidth += (item.width + 2); // todo: borders fix
            } else {
                item.vdom.cls = []; // remove the button cls from the th tag
            }

            // inverse loop direction
            item = items[len - index -1];

            if (item.dock === 'right') {
                style = item.wrapperStyle;
                style.right = dockRightWidth + 'px';

                item.wrapperStyle = style;

                dockRightWidth += (item.width + 1); // todo: borders fix
            }
        });

        me.vdom = vdom;
    }
}

Neo.applyClassConfig(Toolbar);

export {Toolbar as default};