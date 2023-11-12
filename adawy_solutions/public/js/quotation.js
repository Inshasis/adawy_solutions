// Copyright (c) 2023, InshaSiS Technologies and Contributors
// See license.txt

frappe.ui.form.on('Quotation Item', {
	custom_price_list(frm, cdt, cdn) {
	    var item = frappe.get_doc(cdt,cdn);
	    
		// Item Price Price List Wise Rate 
		if(item.custom_price_list){
		    frappe.db.get_list('Item Price',{ 
            fields:['price_list_rate'], 
            filters:{ 
                'item_code':item.item_code,
                'price_list':item.custom_price_list,
                'selling':1
            } 
            }).then(function(doc){ 
                console.log(doc);
                if(doc.length === 1){
                    frappe.model.set_value(cdt,cdn,"rate",doc[0].price_list_rate);
                }
                else{
                    frappe.model.set_value(cdt,cdn,"rate","0.00"); 
                }
            });
		   
		}		
    }
});