<template>
    <div class="w-full h-fit py-10 px-20 flex justify-start flex-col items-center">
        <h2 class=" mb-8 text-3xl text-[#59d460] font-semibold">Drinks</h2>
        <Card class="mb-14" :note="cold_drinks_note" :category="cold_drinks_" :items="cold_drinks"/>
        <Card class="mb-14" :note="hot_drinks_note" :category="hot_drinks_" :items="hot_drinks"/>
        <Card class="mb-14" :category="soft_drinks_" :items="soft_drinks"/>
        <Card class="mb-10" :category="fresh_drinks_" :items="fresh_drinks"/>
        <h2 class="mt-8 mb-8 text-3xl text-[#59d460] font-semibold">Food</h2>
        <Card class="mb-14" :category="salty_food_" :items="salty_food"/>
        <Card class="mb-14" :category="desserts_" :items="desserts"/>
    </div>

</template>

<script>
import Card from './Card.vue'
export default {
    components: {
        Card
    },
    data() {
        return {
            hot_drinks: ['Espresso Coffee', 'Double Espresso', 'Café Latte', 'Cappuccino', 'Nescafe', 'Americano', 'Tea'],
            hot_drinks_: 'Hot Drinks',
            hot_drinks_note: 'you can add flavored syrups to all ofn the above',

            soft_drinks: ['Soda', 'Carbonated Water', 'Water', 'Energy Drink'],
            soft_drinks_: 'Soft Drinks',

            fresh_drinks: ['Orange Juice', 'Carrots', 'Grapefruit'],
            fresh_drinks_: 'Fresh Drinks',

            cold_drinks: ['Lemon Mint', 'Smoothies', 'Milkshakes' ,'Frappe', 'Iced Coffee', 'Iced Mocha', 'Iced Nescafe', 'Slush'],
            cold_drinks_: 'Iced Drinks',
            cold_drinks_note: 'You can add the flavor of your choice to all items except Lemon Mint',

            salty_food: ['Kaak with many kinds of cheese', 'chips'],
            salty_food_: 'Salty Food',

            desserts: ['Crepes', 'Waffles', 'Pancakes', 'Ice Cream'],
            desserts_: 'Desserts'

        }
    },
}
</script>