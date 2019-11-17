import {default as Component} from '../../../src/component/Base.mjs';
import PreviewComponent       from './article/PreviewComponent.mjs';
import TagListComponent       from './article/TagListComponent.mjs';
import {default as VDomUtil}  from '../../../src/util/VDom.mjs';

/**
 * @class RealWorld.views.HomeComponent
 * @extends Neo.component.Base
 */
class HomeComponent extends Component {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.views.HomeComponent'
         * @private
         */
        className: 'RealWorld.views.HomeComponent',
        /**
         * @member {String} ntype='realworld-homecomponent'
         * @private
         */
        ntype: 'realworld-homecomponent',
        /**
         * @member {Object[]|null} articlePreviews_=null
         */
        articlePreviews_: null,
        /**
         * @member {String[]} cls=['home-page']
         */
        cls: ['home-page'],
        /**
         * @member {Number} pageSize_=10
         */
        pageSize_: 10,
        /**
         * @member {RealWorld.views.article.PreviewComponent[]} previewComponents_=[]
         */
        previewComponents: [],
        /**
         * @member {RealWorld.views.article.TagListComponent|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['banner'],
                cn : [{
                    cls: ['container'],
                    cn : [{
                        tag : 'h1',
                        cls : ['logo-font'],
                        html: 'conduit'
                    }, {
                        tag : 'p',
                        html: 'A place to share your knowledge.'
                    }]
                }]
            }, {
                cls: ['container', 'page'],
                cn : [{
                    cls: ['row'],
                    cn : [{
                        cls: ['col-md-9'],
                        cn : [{
                            cls: ['feed-toggle'],
                            cn : [{
                                tag: 'ul',
                                cls: ['nav', 'nav-pills', 'outline-active'],
                                cn : [{
                                    tag: 'li',
                                    cls: ['nav-item'],
                                    cn : [{
                                        tag: 'a',
                                        cls: ['nav-link', 'disabled'],
                                        href: '',
                                        html: 'Your Feed'
                                    }]
                                }, {
                                    tag: 'li',
                                    cls: ['nav-item'],
                                    cn : [{
                                        tag: 'a',
                                        cls: ['nav-link', 'active'],
                                        href: '',
                                        html: 'Global Feed'
                                    }]
                                }]
                            }]
                        }]
                    }]
                }]
            }]
        }
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        let me   = this,
            vdom = me.vdom;

        me.tagList = Neo.create({
            module: TagListComponent
        });

        vdom.cn[1].cn[0].cn.push(me.tagList.vdom);

        me.vdom = vdom;
    }

    /**
     * Tiggered after the articlePreviews config got changed
     * @param {Object[]|null} value
     * @param {Object[]|null} oldValue
     * @private
     */
    afterSetArticlePreviews(value, oldValue) {
        let me        = this,
            container = me.getContainer(),
            vdom      = me.vdom;

        console.log(value);

        container.cn = [container.cn.shift()];

        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                if (!me.previewComponents[index]) {
                    me.previewComponents[index] = Neo.create({
                        module        : PreviewComponent,
                        author        : item.author.username,
                        createdAt     : item.createdAt,
                        description   : item.description,
                        favoritesCount: item.favoritesCount,
                        slug          : item.slug,
                        title         : item.title,
                        userImage     : item.author.image
                    });
                }

                container.cn.push(me.previewComponents[index].vdom);
            });

            me.vdom = vdom;
        }
    }

    /**
     * Tiggered after the pageSize config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @private
     */
    afterSetPageSize(value, oldValue) {
        let me = this,
            i  = 0;

        console.log('afterSetPageSize', value);

        for (; i < value; i++) {

        }
    }

    /**
     * Creates an article id using the view id as a prefix
     * @returns {String} itemId
     */
    getArticleId(id) {
        return this.id + '__' + id;
    }

    /**
     *
     * @return {Object} vdom
     */
    getContainer() {
        let el = VDomUtil.findVdomChild(this.vdom, {cls: 'col-md-9'});
        return el && el.vdom;
    }
}

Neo.applyClassConfig(HomeComponent);

export {HomeComponent as default};