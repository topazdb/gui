<template>
    <div class="announcement">
        <i :class="classes"></i>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    @import "../vars.scss";

    .announcement {
        margin: 15px;
        padding: 15px;
        border: 1px solid;
        color: $primaryColor;
        border-radius: 5px;

        > i, span {
            display: inline-block;
            vertical-align: middle;
        }

        > i {
            margin-right: 15px;
            font-size: 100px
        }

        span {
            font-size: 2em;
        }

        &.critical {
            color: $errorColor;

            .btn {
                background: $errorColor;

                &:hover {
                    background: darken($errorColor, 20%);
                }
            }
        }
    }
</style>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from "vue";

    @Component({
        // @ts-ignore
        props: ["type"]
    })
    export default class Announcement extends Vue {
        public type = "exclamation-triangle";

        get classes() {
            return ["fa", `fa-${this.type}`];
        }
    }
</script>