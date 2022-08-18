<template>
    <div class="w-[250px] h-full">
        <div class="relative flex">
            <img class="w-10 absolute left-[-2.5rem]" src="../assets/icon.svg" alt="Leaf">
            <h2 class="ml-1">{{ category }}</h2>
        </div>
        <div class="mt-1 border-2 rounded-md p-4 border-[#59d460]">
            <div class="flex flex-col flex-wrap leading-7">
                <div class="relative" v-for="item in items">
                    <img src="../assets/dot.svg" alt="" class="w-[8px] rounded-full absolute top-[.6rem]">
                    <p class="ml-5"> {{ item }}</p>
                </div>
            </div>
            <div class="mt-4 italic" v-if="note">
                Note: {{ note }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: String,
        items: Array,
        note: String
    }
}
</script>