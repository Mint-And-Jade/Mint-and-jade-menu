<!-- TODO:  Authorization, Increment Each item in a category: low  -->
<template>
  <main class="w-full h-fit py-10 flex items-center flex-col">
    <!-- nav -->
    <nav class="mb-16 h-fit w-[375px] border-2 rounded-md p-4 border-[#59d460]">
      <!-- wrapper -->
      <div class="flex justify-around">
        <p :class="editStyle" @click="clickedEdit">Edit</p>
        <p :class="addStyle" @click="clickedAdd">Add</p>
      </div>
    </nav>

    <!-- Loading Circle -->
    <div
      role="status"
      class="h-[20vh] flex justify-center items-center"
      v-if="fetching && currentTab == 'edit'"
    >
      <svg
        aria-hidden="true"
        class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-400 fill-[#59d460]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <!-- Edit -->
    <div v-if="currentTab == 'edit'">
      <!-- foreach section -->
      <div
        v-for="(section, indexS) in data"
        :key="section._id"
        class="flex flex-col items-center"
      >
        <!-- section title -->
        <h2 class="mb-8 text-3xl text-[#59d460] font-semibold w-fit">
          {{ section.name }}
        </h2>
        <!-- foreach category -->
        <div
          v-for="(category, indexC) in section.categories"
          :key="category._id"
          class="h-fit w-[375px] border-2 rounded-md p-4 border-[#59d460] mb-[5rem] relative"
        >
          <!-- category title -->
          <p class="absolute top-[-30px] left-[-0px] italic">
            {{ category.name }}
          </p>
          <p
            @click="toggleModal(category)"
            class="cursor-pointer absolute top-[-30px] left-[100px] text-[#59d460]"
          >
            Edit
          </p>
          <!-- foreach item -->
          <div
            v-for="(item, index) in category.items"
            :key="item._id"
            class="flex justify-around items-center mb-[1rem]"
          >
            <div class="flex justify-between w-[65%] inputs">
              <input
                class="w-[70%]"
                v-model="data[indexS].categories[indexC].items[index].name"
                @focus="
                  itemEdited(data[indexS].categories[indexC].items[index])
                "
              />
              <div class="">
                <input
                  class="max-w-[3.5rem] border"
                  v-model="data[indexS].categories[indexC].items[index].price"
                  @focus="
                    itemEdited(data[indexS].categories[indexC].items[index])
                  "
                />LBP
              </div>
            </div>
            <div
              :id="item._id"
              :data-itemId="item._id"
              class="px-[1rem] py-[.5rem] rounded-lg bg-red-500 hover:cursor-pointer unselectable"
              @click="openDeleteConfirmation(item)"
            >
              Delete
            </div>
          </div>
          <div class="mt-4 italic" v-if="category.note">
            Note: {{ category.note }}
          </div>
        </div>
      </div>
    </div>

    <!-- Add -->
    <div class="w-[375px]" v-if="currentTab == 'add'">
      <div
        class="w-full flex justify-start flex-col items-center relative mb-[4rem]"
      >
        <h2 class="mb-8 text-3xl text-[#59d460] font-semibold">Add Item</h2>
        <div
          class="mt-1 border-2 rounded-md border-[#59d460] w-full flex items-center flex-col gap-y-16 p-[60px]"
        >
          <!-- item name -->
          <div class="flex flex-col">
            <label class="mb-2" for="name">Name:</label>
            <input
              class="border-2 px-2 py-1 border-[#59d460]"
              type="text"
              v-model="itemName"
            />
          </div>
          <!-- item price -->
          <div class="flex flex-col">
            <label class="mb-2" for="price">Price:</label>
            <input
              class="border-2 px-2 py-1 border-[#59d460]"
              type="text"
              v-model="itemPrice"
            />
          </div>
          <!-- Categories -->
          <div class="flex flex-col w-[225px]">
            <label class="mb-2" for="category">Category:</label>
            <select
              class="border-2 px-2 py-1"
              name="category"
              @change="onItemChange($event)"
            >
              <option :value="null">--- Select A Category ---</option>
              <option :value="category._id" v-for="category in categories">
                {{ category.name }}
              </option>
            </select>
          </div>
          <!-- submit button -->
          <div class="">
            <div
              id="submit"
              @click.once="createItem()"
              class="bg-[#59d460] p-3 rounded-lg px-6 text-white cursor-pointer"
            >
              Add
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex justify-start flex-col items-center relative">
        <h2 class="mb-8 text-3xl text-[#59d460] font-semibold">Add Category</h2>
        <div
          class="mt-1 border-2 rounded-md border-[#59d460] w-full flex items-center flex-col gap-y-16 p-[60px]"
        >
          <!-- category name -->
          <div class="flex flex-col">
            <label class="mb-2" for="name">Name:</label>
            <input
              class="border-2 px-2 py-1 border-[#59d460]"
              type="text"
              v-model="categoryName"
            />
          </div>
          <!-- category note -->
          <div class="flex flex-col">
            <label class="mb-2" for="name">Note:</label>
            <textarea
              class="border-2 px-2 py-1 border-[#59d460]"
              v-model="categoryNote"
              name="note"
              id="note"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <!-- section -->
          <div class="flex flex-col w-[225px]">
            <label class="mb-2" for="category">Section:</label>
            <select
              class="border-2 px-2 py-1"
              name="section"
              @change="onSectionChange($event)"
            >
              <option :value="null">--- Select A Section ---</option>
              <option :value="section._id" v-for="section in sections">
                {{ section.name }}
              </option>
            </select>
          </div>
          <!-- submit button -->
          <div class="">
            <div
              id="submit"
              @click.once="createCategory"
              class="bg-[#59d460] p-3 rounded-lg px-6 text-white"
            >
              Add
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Edit Modal -->
    <div
      v-if="modalState"
      @click.self="modalState = false"
      style="background-color: rgba(0, 0, 0, 0.6)"
      class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center cursor-pointer"
    >
      <div
        class="w-[90vw] h-[80vh] bg-white rounded-xl p-[2rem] flex justify-evenly flex-col text-l cursor-default"
      >
        <!-- Modal Body -->
        <div class="flex justify-evenly">
          <h2>Category Name:</h2>
          <input
            class="border p-2 w-[40%]"
            v-model="modalCategoryName"
            type="text"
          />
        </div>
        <div class="flex justify-evenly">
          <h2>Category Note:</h2>
          <textarea
            class="border p-2 w-[40%]"
            v-model="modalCategoryNote"
            name=""
            id=""
          ></textarea>
        </div>
        <div class="flex justify-evenly">
          <div
            class="bg-[#59d460] px-[2rem] py-[1rem] rounded-lg cursor-pointer"
            @click.once="submitCategoryChanges()"
          >
            Apply Changes
          </div>
          <div
            class="bg-red-500 px-[2rem] py-[1rem] rounded-lg cursor-pointer"
            @click="modalState = false;openDeleteConfirmation(this.modalCategory)"
          >
            Delete
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="deleteModalState"
      @click.self="deleteModalState = false"
      style="background-color: rgba(0, 0, 0, 0.6)"
      class="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center cursor-pointer"
    >
      <div
        class="w-[90vw] h-[80vh] bg-white rounded-xl p-[2rem] flex justify-evenly flex-col text-l cursor-default"
      >
        <!-- Modal Body -->
        <h1 class="self-center">Are you sure you want to delete <span class="font-bold">{{ this.deleteModalData.name }}</span>?</h1>
          <div class="flex justify-evenly">
          <div
            class="bg-[#59d460] px-[2rem] py-[1rem] rounded-lg cursor-pointer"
            @click="deleteModalState = false"
          >
            Go Back
          </div>
          <div
            class="bg-red-500 px-[2rem] py-[1rem] rounded-lg cursor-pointer"
            @click="deleteData()"
          >
            Delete
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div
      id="submitBtn"
      v-if="currentTab == 'edit'"
      class="bg-[#59d460] px-[2rem] py-[1rem] rounded-lg cursor-pointer"
      @click.once="submitChanges()"
    >
      Apply Changes
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    async startPage() {
      await fetch(`${this.hostName}/get-all-page-data`, {
        method: "GET",
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          this.sections = data[0];
          this.categories = data[1];
          this.items = data[2];
        })
        .catch((err) => {
          console.log(err);
        });

      this.data = [...this.sections];

      for (let i = 0; i < this.data.length; i++) {
        let section = this.data[i];
        let result = this.categories.filter(
          (category) => category.section_id == section._id
        );
        section.categories = result;

        for (let j = 0; j < section.categories.length; j++) {
          const category = section.categories[j];
          let items = this.items.filter(
            (item) => item.category_id == category._id
          );
          category.items = items;
        }
      }
      setTimeout(() => {
        window.scroll(0, window.localStorage.getItem("pos"));
        window.localStorage.setItem("pos", 0);
      }, 100);

      this.fetching = false;
    },
    clickedAdd() {
      this.currentTab = "add";
      this.editStyle = "cursor-pointer";
      this.addStyle = "cursor-pointer text-[#59d460]";
    },
    clickedEdit() {
      this.currentTab = "edit";
      this.addStyle = "cursor-pointer";
      this.editStyle = "cursor-pointer text-[#59d460]";
    },
    deleteItem(itemId) {
      fetch(`${this.hostName}/delete-item`, {
        method: "DELETE",
        body: JSON.stringify({ item_id: itemId }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        window.localStorage.setItem("pos", window.scrollY);
        location.reload();
      });
    },
    itemEdited(item) {
      let inList = false;
      for (let i = 0; i < this.editedItems.length; i++) {
        if (item._id == this.editedItems[i]._id) {
          this.editedItems[i].name = item.name;
          this.editedItems[i].price = item.price;
          inList = true;
        }
      }
      if (inList === false) {
        this.editedItems = [...this.editedItems, item];
      }
    },
    submitChanges() {
      document.querySelector("#submitBtn").style.backgroundColor = "#6e8978";
      fetch(`${this.hostName}/edit-items`, {
        method: "PUT",
        body: JSON.stringify({ editedItems: this.editedItems }),
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => {
          return result.json();
        })
        .then((data) => {
          location.reload();
        });
    },

    // Add
    onItemChange(e) {
      this.itemCategoryId = e.target.value;
    },
    createItem() {
      document.querySelector("#submit").style.backgroundColor = "#6e8978";
      fetch(`${this.hostName}/add-item`, {
        method: "POST",
        body: JSON.stringify({
          name: this.itemName,
          price: this.itemPrice,
          category_id: this.itemCategoryId,
        }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        window.localStorage.setItem("pos", window.scrollY);
        location.reload();
      });
    },
    onSectionChange(e) {
      this.categorySectionId = e.target.value;
    },
    createCategory() {
      document.querySelector("#submit").style.backgroundColor = "#6e8978";
      fetch(`${this.hostName}/add-category`, {
        method: "POST",
        body: JSON.stringify({
          name: this.categoryName,
          note: this.categoryNote,
          section_id: this.categorySectionId,
        }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        window.localStorage.setItem("pos", window.scrollY);
        location.reload();
      });
    },

    // Edit Modal
    toggleModal(category) {
      this.modalState = !this.modalState;
      this.modalCategoryName = category.name;
      this.modalCategoryId = category._id;
      this.modalCategoryNote = category.note;
      this.modalCategory = category
    },

    deleteCategory(categoryId) {
      fetch(`${this.hostName}/delete-category`, {
        method: "DELETE",
        body: JSON.stringify({ category_id: categoryId }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        window.localStorage.setItem("pos", window.scrollY);
        location.reload();
      });
    },

    submitCategoryChanges() {
      fetch(`${this.hostName}/edit-categories`, {
        method: "PUT",
        body: JSON.stringify({
          editedCategory: [
            {
              _id: this.modalCategoryId,
              name: this.modalCategoryName,
              note: this.modalCategoryNote,
            },
          ],
        }),
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        location.reload();
      });
    },

    // Delete Modal
    openDeleteConfirmation(data) {
      this.deleteModalState = true;
      this.deleteModalData = data;
    },

    deleteData() {
      if (this.deleteModalData.section_id) {
        this.deleteCategory(this.deleteModalData._id)
      }
      else if (this.deleteModalData.category_id) {
        this.deleteItem(this.deleteModalData._id)
      }
    }
  },
  data() {
    return {
      hostName: "https://back-end-mint-and-jade-menu.vercel.app",
      currentTab: "edit",
      addStyle: "cursor-pointer",
      editStyle: "cursor-pointer text-[#59d460]",
      data: undefined,
      items: undefined,
      categories: undefined,
      sections: undefined,
      editedItems: [],
      fetching: true,

      // Add
      itemName: undefined,
      itemPrice: undefined,
      itemCategoryId: undefined,
      categoryName: undefined,
      categoryNote: undefined,
      categorySectionId: undefined,

      // Edit Modal
      modalState: false,
      modalCategory: {},
      modalCategoryName: "",
      modalCategoryId: undefined,
      modalCategoryNote: undefined,

      // Delete Modal
      deleteModalState: false,
      deleteModalData: {},
    };
  },
  created() {
    this.startPage();
  },
};
</script>

<style>
input:focus {
  outline: none;
}

.inputs {
  font-size: 0.9rem;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.1);
}

.unselectable {
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
