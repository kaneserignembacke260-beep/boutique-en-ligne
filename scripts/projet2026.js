// THIAM COUNDOUL Abdou/ KANE Serigne Mbacke

// ===  variables globales === 

// constantes
const MAX_QTY = 9;

//  tableau des produits à acheter
const cart = []
// total actuel des produits dans le panier
let total = 0;


// === initialisation au chargement de la page ===

/**
* Création du Magasin, mise à jour du total initial
* Mise en place du gestionnaire d'événements sur filter
*/
const init = function () {
	createShop();
	updateTotal();
	const filter = document.getElementById("filter");
	filter.addEventListener("keyup", filterDisplaidProducts);
}


// ==================== fonctions utiles ======================= 

/**
* Crée et ajoute tous les éléments div.produit à l'élément div#boutique
* selon les objets présents dans la variable 'catalog'
*/
const createShop = function () {
	const shop = document.getElementById("boutique");
	for(let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
	}
}

/**
* Crée un élément div.produit qui posséde un id de la forme "i-produit" où l'indice i 
* est correpond au paramètre index
* @param {Object} product - le produit pour lequel l'élément est créé
* @param {number} index - l'indice (nombre entier) du produit dans le catalogue (utilisé pour l'id)
* @return {Element} une div.produit
*/
const createProduct = function (product, index) {
	// créer la div correpondant au produit
	const divProd = document.createElement("div");
	divProd.className = "produit";
	// fixe la valeur de l'id pour cette div
	divProd.id = index + "-product";
	// crée l'élément h4 dans cette div
	divProd.appendChild(createBlock("h4", product.name));
	
	// Ajoute une figure à la div.produit... 
	// /!\ non fonctionnel tant que le code de createFigureBlock n'a pas été modifié /!\ 
	divProd.appendChild(createFigureBlock(product));

	// crée la div.description et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.description, "description"));
	// crée la div.prix et l'ajoute à la div.produit
	divProd.appendChild(createBlock("div", product.price, "prix"));
	// crée la div.controle et l'ajoute à la div.produit
	divProd.appendChild(createOrderControlBlock(index));
	return divProd;
}


/** Crée un nouvel élément avec son contenu et éventuellement une classe
 * @param {string} tag - le type de l'élément créé (example : "p")
 * @param {string} content - le contenu html de l'élément a créé  (example : "bla bla")
 * @param {string} [cssClass] - (optionnel) la valeur de l'attribut 'classe' de l'élément créé
 * @return {Element} élément créé
 */
const createBlock = function (tag, content, cssClass) {
	const element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/** Met à jour le montant total du panier en utilisant la variable globale total
 */
const updateTotal = function () {
	const montant = document.getElementById("montant");
	montant.textContent = total;
}

// ======================= fonctions à compléter =======================


/**
* Crée un élément div.controle pour un objet produit
* @param {number} index - indice du produit considéré
* @return {Element}
* TODO : AJOUTER les gestionnaires d'événements
*/
const createOrderControlBlock = function (index) {
	const control = document.createElement("div");
	control.className = "controle";

	// crée l'élément input permettant de saisir la quantité
	const input = document.createElement("input");
	input.id = index + "-qte";
	input.type = "number";
	input.step = "1";
	input.value = "0";
	input.min = "0";
	input.max = MAX_QTY.toString();

	// TODO :  Q5 mettre en place le gestionnaire d'événément pour input permettant de contrôler les valeurs saisies
	control.appendChild(input);
	input.addEventListener("change",verifQuantity);

	// Crée le bouton de commande
	const button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-order";
	control.appendChild(button);
	return control;
}


/** 
* Crée un élément figure correspondant à un produit
* @param {Object} product -  le produit pour lequel la figure est créée
* @return {Element}
*/
const createFigureBlock = function (product) {
	// TODO : code incorrect : à modifier Q4 
	const elem=document.createElement("figure");
	const img=document.createElement("img");
	img.src=product.image;
	img.alt=product.name;
	elem.appendChild(img);
	return elem;

}


/** 
* @todo Q8
*/

const orderProduct = function () {
	const idx = parseInt(this.id);
	const qty = parseInt(document.getElementById(idx + "-qte").value);
	if (qty > 0) {
		addProductToCart(idx, qty); // ajoute un produit au panier
		//TODO gérer la remise à zéro de la quantité après la commande 
		// et tous les comportements du bouton représentant le chariot
		this.style.opacity = '0.25';
		const input = document.getElementById(idx + "-qte");
		input.value = '0';
	}

}


// ======================= fonctions à coder =======================

/**
* @todo Q6- Q7
*/
const verifQuantity = function () {
	//TODO
	const bouton = document.getElementById(parseInt(this.id)+'-order');
	if (isNaN(this.value) || this.value <= 0){
		this.value = '0';
		bouton.style.opacity = "0.25";
	}
	else if (this.value > 9){
		this.value = '9';
		bouton.style.opacity = "1";
		bouton.addEventListener('click', orderProduct);
	}
	else{
		bouton.style.opacity = "1";	
		bouton.addEventListener('click', orderProduct);
	}
}



/**
* @todo Q9
* @param {number} index
* @param {number} qty
*/
const addProductToCart = function (index, qty) {
	//TODO
	const produit = catalog[index];
	if (!(cart.includes(produit))){
		cart.push(produit);
		creationDivAchat(index, qty, produit);
		changeMontant(qty, produit);
	}
	else{
		modifQtyEtMontant(index, qty, produit);
	}
	const bouton = document.getElementById(index + '-remove');
	bouton.addEventListener('click', () => supprimeProduit(index, produit));
}

/**
* crée un div achat du prduit avec tous ses éléments.
* @param {number} index
* @param {number} qty
* @param {Element} produit
*/
function creationDivAchat(index, qty, produit){
		const achats = document.getElementsByClassName('achats')[0];
		const achat = document.createElement('div');
		achat.className = "achat";
		achat.id = index + '-achat';
		const figure = createFigureBlock(produit);
		achat.appendChild(figure);
		const description = createBlock('h4', produit.description);
		achat.appendChild(description);
		const quantite = createBlock('div', qty, 'quantite');
		achat.appendChild(quantite);
		const prix = createBlock('div', produit.price, 'prix');
		achat.appendChild(prix);
		const bouton = createBlock('button', '', 'retirer');
		bouton.id = index + '-remove';
		const controle = createBlock('div', '', 'controle');
		controle.appendChild(bouton);
		achat.appendChild(controle);
		achats.append(achat);
}

/**
* modifie la quantite du produit dans le panier.
* @param {number} index
* @param {number} qty
* @param {Element} produit
*/
function modifQtyEtMontant(index, qty, produit){
	const achat = document.getElementById(index + '-achat');
	const quantite = achat.getElementsByClassName('quantite')[0];
	const qtyProduit = parseInt(quantite.innerHTML) + qty;
	if( qtyProduit <= MAX_QTY){
			quantite.innerHTML = qtyProduit;
			changeMontant(qty, produit);
		}
}

/**
* modifie le montant.
* @param {number} qty
* @param {Element} produit
*/
function changeMontant(qty, produit){
	const montant = document.getElementById('montant');
	total = total + qty*produit.price;
	montant.innerHTML = total;
}

/**
* Supprime le produit.
* @param {number} index
* @param {product} produit
*/
function supprimeProduit(index, produit){
	const achat = document.getElementById(index + '-achat');
	const qtyProduit = achat.getElementsByClassName('quantite')[0].innerHTML;
	total = total - qtyProduit*produit.price;
	const montant = document.getElementById('montant');
	montant.innerHTML = total;
	const achats = document.getElementsByClassName('achats')[0];
	achats.removeChild(achat);
	cart.splice(cart.indexOf(produit), 1);
}
/**
* @todo Q10
*/
const filterDisplaidProducts = function () {
	for (let i=0; i<catalog.length; i++){
		let produit = catalog[i];
		let elem = document.getElementById(i+'-product');
		//console.log((produit.name).indexOf(this.value));
		if(((produit.name.toLowerCase()).indexOf(this.value) <0)){
			elem.style.display = 'none';
		}
		else{
			elem.style.display = '';
		}
	}
}


// ====================  Exécuter l'initialisation ======================= 
/*Q1*/
console.log(document.readyState); // Vérification du chargement du DOM 
//("loading" not OK; "interactive" ou "loaded": OK)

init()

