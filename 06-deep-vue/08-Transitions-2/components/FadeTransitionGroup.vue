<script>
function cloneVNode(vnode) {
  const VNode = vnode.__proto__.constructor;
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
export default {
  name: 'FadeTransitionGroup',
  render(createElement) {
    let renderArr = [];
    if (this.$slots.default) {
      renderArr = this.$slots.default.map(function (slot) {
        const cloneN = cloneVNode(slot);
        if (Object.prototype.hasOwnProperty.call(cloneN.data, 'staticClass')) {
          cloneN.data.staticClass += ' fade-list-item';
        } else {
          cloneN.data.staticClass = 'fade-list-item';
        }
        return cloneN;
      });
    }

    return createElement(
      'transition-group',
      {
        attrs: { ...this.$attrs, name: 'fade-list', class: 'fade-list' },
        on: this.$listeners,
      },
      renderArr,
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
