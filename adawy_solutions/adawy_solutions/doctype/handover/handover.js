// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('HandOver', {
    customer_name: function(frm) {
        frm.trigger("customer_address");
        frm.trigger("customer_contact");
    },
    customer_address: function(frm) {
        if (! frm.doc.customer_name) return;
        frappe.call({
            method:"adawy_solutions.adawy_solutions.doctype.handover.handover.fetch_address",
            args:{
                customer:frm.doc.customer_name,
            },
            callback:function(r){
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("address", function(doc) {
                        return{
                            filters: [
                                ['Address', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    },
    customer_contact: function(frm) {
        if (! frm.doc.customer_name) return;
        frappe.call({
            method:"adawy_solutions.adawy_solutions.doctype.handover.handover.fetch_contact",
            args:{
                customer:frm.doc.customer_name,
            },
            callback:function(r){
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("contact_person", function(doc) {
                        return{
                            filters: [
                                ['Contact', 'name', 'in' , r.message]
                            ]
                        };
                    });  
                       
                }
            }
           
        });
    }
});