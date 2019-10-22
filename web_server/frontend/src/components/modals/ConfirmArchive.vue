<template>
    <ConfirmDialog
        title="Confirm?"
        description="Do you really want to archive this selection?"
        :show="show"
    ></ConfirmDialog>
</template>
<script>
import ConfirmDialog from "./Confirm.vue";
export default {
    name:"ConfirmArchive",
    components: {
        ConfirmDialog
    },
    props: ["show"],
}
</script>