const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			foto: [
				
			],
			contacts: [

			],

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			
			loadSrc: async(id) => {
				const response = await fetch(`https://randomuser.me/api/`)
				const data = await response.json()
				// console.log(data)
				setStore({foto: data.results[0].picture.medium});
			},
			
			editContact: async (theid, contact) => {
				const config = {
				  method: "PUT",
				  body: JSON.stringify(contact),
				  headers: { "Content-Type": "application/json" }
				};
			  
				try {
				  const response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${theid}`, config);
				  if (response.ok) {
					const data = await response.json();
					setStore({contact: data})
					console.log("Contact updated successfully");
					navigate("/");
				  } else {
					throw new Error("Failed to update contact");
				  }
				} catch (error) {
				  console.error("Error:", error);
				}
			  }
			  
			  
			  

		}
	};
};

export default getState;
