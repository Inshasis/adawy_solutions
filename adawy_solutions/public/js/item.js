// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Item', {
    validate(frm) {
		if(cur_frm.doc.custom_new_price){
			if(cur_frm.doc.custom_mit_ && cur_frm.doc.custom_rental_){
				let new_price = cur_frm.doc.custom_new_price * cur_frm.doc.custom_mit_ / 100;
				cur_frm.set_value("custom_second_hand_price",new_price);
				
				let second_hand_price = cur_frm.doc.custom_second_hand_price*cur_frm.doc.custom_rental_/100;
				cur_frm.set_value("custom_rental_price",second_hand_price);
			}
			else{
				let new_price = cur_frm.doc.custom_new_price / 2;
				cur_frm.set_value("custom_second_hand_price",new_price);
				
				//Second Hand To Rental
				let second_hand_price = cur_frm.doc.custom_second_hand_price*7/100;
				cur_frm.set_value("custom_rental_price",second_hand_price);

			}
		}	
    },
    
    custom_new_price(frm) {
        if(!cur_frm.doc.custom_mit_){
	        let new_price = cur_frm.doc.custom_new_price / 2;
		    cur_frm.set_value("custom_second_hand_price",new_price);
	    }
		else{
			let new_price = cur_frm.doc.custom_new_price * cur_frm.doc.custom_mit_ / 100;
            cur_frm.set_value("custom_second_hand_price",new_price);
		}
    },
	custom_mit_(frm) {
        let new_price = cur_frm.doc.custom_new_price * cur_frm.doc.custom_mit_ / 100;
	    cur_frm.set_value("custom_second_hand_price",new_price);
	},
	
	//Second Hand To Rental
	custom_second_hand_price(frm) {
	    if(!cur_frm.doc.custom_rental_){
    	    let second_hand_price = cur_frm.doc.custom_second_hand_price*7/100;
    		cur_frm.set_value("custom_rental_price",second_hand_price);
	    }
		else{
			let second_hand_price = cur_frm.doc.custom_second_hand_price*cur_frm.doc.custom_rental_/100;
			cur_frm.set_value("custom_rental_price",second_hand_price);
		}
	},
	custom_rental_(frm) {
	    let second_hand_price = cur_frm.doc.custom_second_hand_price*cur_frm.doc.custom_rental_/100;
		cur_frm.set_value("custom_rental_price",second_hand_price);
	}
});