// // Copyright (c) 2023, InshaSiS Technologies and Contributors
// // See license.txt


//Invoice Templete Select After Auto Insert Data In Child table
frappe.ui.form.on('Opportunity', {
	custom_invoice_template(frm) {
	    if(cur_frm.doc.custom_invoice_template){
		frappe.call({
            method: 'adawy_solutions.adawy_solutions.doctype.opportunity.opportunity.fetch_data',
            args: {
                invoice_template: cur_frm.doc.custom_invoice_template,
            },
            callback: function (r) {
                console.log(r.message);
                cur_frm.clear_table("items");
                $.each(r.message, function(_i, e){
                let entry = frm.add_child("items");
                entry.item_group = e.item_group;
                });
                refresh_field("items");
            }
        });
	    }
	    else{
	        cur_frm.clear_table("items");
            cur_frm.refresh_fields("items");
	    }
	}
});

//Item Group Wise Item Code Fetch
frappe.ui.form.on('Opportunity', {
    custom_invoice_template: function (frm, cdt, cdn) {
            cur_frm.set_query("item_code", "items", function (doc, cdt, cdn) {
                var d = locals[cdt][cdn];
                return {
                    filters: [
                        ['Item', 'item_group', 'in', d.item_group]
                    ]
                };
            });
    }
});


// frappe.ui.form.on('Opportunity Item', {
//     item_code(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);
// 		// MIT Amount
// 		if(item.item_code){
// 		    frappe.db.get_list('Item Price',{ 
//                 fields:['price_list_rate'], 
//                 filters:{ 
//                     'item_code':item.item_code,
//                     'price_list':"MIT Selling (Oman)",
//                     'selling':1
//                 } 
//             }).then(function(doc){ 
//                 console.log(doc);
//                 if(doc.length === 1){
//                     var mit_50_per = doc[0].price_list_rate / 2;
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_50_per);

//                     var d = locals[cdt][cdn];
//                     var total = 0;
//                     cur_frm.doc.items.forEach(function(d) {
//                         total += d.custom_mit_amount;
//                     });
//                     // console.log(total)
//                     frm.set_value('custom_mit_total', total);
//                     refresh_field('custom_mit_total');
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount","0.00"); 
//                 }
//             });
// 		}    		
//     },
//     qty(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);
// 		// MIT Amount
// 		if(item.item_code){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':"MIT Selling (Oman)",
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 console.log(doc);
//                 if(doc.length === 1){
//                     var mit_50_per = doc[0].price_list_rate / 2;
//                     var mit_50_per_qty = mit_50_per * item.qty;
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount",mit_50_per_qty);

//                     var d = locals[cdt][cdn];
//                     var total = 0;
//                     cur_frm.doc.items.forEach(function(d) {
//                         total += d.custom_mit_amount;
//                     });
//                     // console.log(total)
//                     frm.set_value('custom_mit_total', total);
//                     refresh_field('custom_mit_total');
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"custom_mit_amount","0.00"); 
//                 }
//             });
// 		}    		
//     },
//     items_remove: function(frm, cdt, cdn) {
//         var d = frappe.get_doc(cdt,cdn);
// 	    var d = locals[cdt][cdn];
//         var total = 0;
//         cur_frm.doc.items.forEach(function(d) {
//             total += d.custom_mit_amount;
//         });
//         console.log(total)
//         frm.set_value('custom_mit_total', total);
//         refresh_field('custom_mit_total');
//     },
//  	custom_price_list(frm, cdt, cdn) {
// 	    var item = frappe.get_doc(cdt,cdn);
	    
// 		// Item Price Price List Wise Rate 
// 		if(item.custom_price_list){
// 		    frappe.db.get_list('Item Price',{ 
//             fields:['price_list_rate'], 
//             filters:{ 
//                 'item_code':item.item_code,
//                 'price_list':item.custom_price_list,
//                 'selling':1
//             } 
//             }).then(function(doc){ 
//                 // console.log(doc);
//                 if(doc.length === 1){
//                     frappe.model.set_value(cdt,cdn,"rate",doc[0].price_list_rate);
//                 }
//                 else{
//                     frappe.model.set_value(cdt,cdn,"rate","0.00"); 
//                 }
//             });
		   
// 		}		
//     }
// });

// frappe.ui.form.on('Opportunity',  {
//     validate: function(frm, cdt, cdn) {
//         var d = locals[cdt][cdn];
//         var total = 0;
//         cur_frm.doc.items.forEach(function(d) {
//             total += d.custom_mit_amount * d.qty;
//         });
//         // console.log(total)
//         frm.set_value('custom_mit_total', total);
        
//     }
// });

