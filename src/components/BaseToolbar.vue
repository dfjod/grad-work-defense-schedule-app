<template>
    <div class="toolbar">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="middle">
            <slot name="middle"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.left, .middle, .right {
    display: flex;
    align-items: center;
}

.right {
    gap: 5px;
}
</style>
