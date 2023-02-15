<template>
    <div>
        <header
            class="h-[100vh] header-bg bg-no-repeat bg-cover grid grid-rows-[80%_20%] grid-cols-[15%_70%_15%] text-center relative">
            <div class="row-start-1 col-start-2 flex items-center justify-center flex-col">
                <h1 class="text-5xl font-serif mb-3">Mint & Jade</h1>
                <h2 class="mb-5">Open from 9 AM till 1 AM</h2>
                <p>~By Y.K.</p>
            </div>
            <div class="absolute right-6 bottom-4 flex items-center justify-end w-fit gap-6">
                <div v-if="isAuth"
                    @click="this.$router.push('/dashboardweioruvwurqwervjoqwjiriowjoqrjvinwirjnbqwehtbnvwiptnipqwejnvtiopqwntiqwnipuhnvtuiqnt564tq68541t56qv1t561vtq56t41q')"
                    class="text-xl font-bold text-black/50 cursor-pointer">
                    Dashboard
                </div>
                <a href="https://www.instagram.com/mintandjade/" target="_blank" class=""><img class="w-8 opacity-50"
                        src="../assets/instagram-brands.svg" alt="Instagram Logo"></a>
            </div>
        </header>

        <!-- Loading Circle -->
        <div role="status" class="h-[20vh] flex justify-center items-center" v-if="fetching">
            <svg aria-hidden="true" class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-[#59d460]"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>


        <main>
            <div class="w-full h-fit py-10 flex justify-start flex-col items-center text-[.955rem]">
                <div class="flex justify-start flex-col items-center" v-for="section in data">

                    <h2 class=" mb-8 text-3xl text-[#59d460] font-semibold">{{ section.name }}</h2>
                    <div class="mb-14" v-for="category in section.categories">

                        <div class="w-[80vw] h-fit ml-4">
                            <div class="relative flex">
                                <img class="w-8 absolute left-[-2rem]" src="../assets/icon.svg" alt="Leaf">
                                <h2 class="ml-1">{{ category.name }}</h2>
                            </div>
                            <div class="mt-1 border-2 rounded-md p-4 border-[#59d460]">
                                <div class="flex flex-col flex-wrap leading-7">
                                    <div class="relative max-h-[28px]" v-for="item in category.items">
                                        <div class="flex justify-between">
                                            <!-- wrapper -->
                                            <div class="w-[75%]">
                                                <img src="../assets/dot.svg" alt=""
                                                    class="w-[8px] rounded-full absolute top-[.6rem]">
                                                <p class="ml-5"> {{ item.name }}</p>
                                            </div>
                                            <div class="w-[75px]">
                                                {{ item.price.toLocaleString() }} LL
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4 italic" v-if="category.note">
                                    Note: {{ category.note }}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>



    </div>
</template>


<script>
import Data from '../Json/Data.json' assert {type: 'json'};

export default {
    data() {
        return {
            data: undefined,
            isAuth: false,
            fetching: true
        }
    },
    mounted() {
        if (window.localStorage.getItem('isAuthenticated') === 'true') {
            this.isAuth = true;
        }
    },
    methods: {
        async fetchData() {
            await fetch('https://zealous-cyan-katydid.cyclic.app/get-all-page-data', { method: 'GET' })
                .then((result) => {
                    return result.json()
                })
                .then(data => {
                    this.sections = data[0]
                    this.categories = data[1]
                    this.items = data[2]
                })
                .catch((err) => {
                    console.log(err);
                });

            this.data = [...this.sections]

            for (let i = 0; i < this.data.length; i++) {
                let section = this.data[i]
                let result = this.categories.filter((category) => category.section_id == section._id)
                section.categories = result

                for (let j = 0; j < section.categories.length; j++) {
                    const category = section.categories[j];
                    let items = this.items.filter(item => item.category_id == category._id)
                    category.items = items
                }
            }

            this.fetching = false
        },
    },
    created() {
        this.fetchData()
    }

}
</script>
