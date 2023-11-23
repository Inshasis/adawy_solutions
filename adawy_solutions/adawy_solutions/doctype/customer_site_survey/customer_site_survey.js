// Copyright (c) 2023, InshaSiS Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on("Customer Site Survey", {
    customer: function(frm) {
        frm.trigger("customer_address");
        frm.trigger("customer_contact");
    },
    customer_address: function(frm) {
        if (! frm.doc.customer) return;
        frappe.call({
            method:"adawy_solutions.adawy_solutions.doctype.customer_site_survey.customer_site_survey.fetch_address",
            args:{
                customer:frm.doc.customer,
            },
            callback:function(r){
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("location", function(doc) {
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
        if (! frm.doc.customer) return;
        frappe.call({
            method:"adawy_solutions.adawy_solutions.doctype.customer_site_survey.customer_site_survey.fetch_contact",
            args:{
                customer:frm.doc.customer,
            },
            callback:function(r){
                console.log(r.message);
                if (r.message) {
                    cur_frm.set_query("related_person", function(doc) {
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

//Item Calculation

frappe.ui.form.on('Customer Site Survey', {
	refresh(frm) {
	    if(frm.is_new()){
	        frm.set_value("survey_date",frappe.datetime.now_datetime());
		    frm.set_df_property('survey_duration','hidden', 1);
	    }
	},
    location_open(frm){
        var myWin = window.open(cur_frm.doc.map_location);
    }
    
});

frappe.ui.form.on('Customer Site Survey', {
    total_switchport: function(frm) {
        //24 Port Switch
        let port = cur_frm.doc.total_switchport/24;
        let result = Number.isInteger(port);
        
        if(result === true){
            let tot = Math.floor(port);
            frm.set_value("switch_24port",tot);
        }
        else{
            let tot = Math.floor(port);
            frm.set_value("switch_24port",tot+1);
        }
        //48 Port Switch
        let port1 = cur_frm.doc.total_switchport/48;
        let result1 = Number.isInteger(port1);
        
        if(result1 === true){
            let tot = Math.floor(port1);
            frm.set_value("switch_48port",tot);
        }
        else{
            let tot = Math.floor(port1);
            frm.set_value("switch_48port",tot+1);
        }
	}
});



frappe.ui.form.on('T-Floor equipment Calculation', {
    wifi:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total Wifi
        var total_wifi = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_wifi += d.wifi;
        });
        frm.set_value('total_wifi', total_wifi);
        
        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
    },
    voip:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total VOIP
        var total_voip = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_voip += d.voip;
        });
        frm.set_value('total_voip', total_voip);
        
        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
    },
    iptv:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total IPTV
        var total_iptv = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_iptv += d.iptv;
        });
        frm.set_value('total_iptv', total_iptv);
        
        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
    },
    cctv:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total CCTV
        var total_cctv = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_cctv += d.cctv;
        });
        frm.set_value('total_cctv', total_cctv);
        
        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
    },
    access_doorbell:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total access_doorbell
        var total_ad = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_ad += d.access_doorbell;
        });
        frm.set_value('custom_total_accessattendance', total_ad);
        
        //Total switch_ports
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
    },
    printer:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total printer
        var total_print = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_print += d.printer;
        });
        frm.set_value('custom_total_printer', total_print);
        
        //Total switch_ports
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
    },
    attendance:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total attendance
        var attendance = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            attendance += d.attendance;
        });
        frm.set_value('custom_total_attendance', attendance);
        
        //Total switch_ports
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
    },
    screen_signage:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        frappe.model.set_value(cdt,cdn,"switch_ports", d.wifi + d.voip + d.iptv + d.cctv + d.access_doorbell + d.printer + d.attendance + d.screen_signage);
        
        //Total screen_signage
        var screen_signage = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            screen_signage += d.screen_signage;
        });
        frm.set_value('custom_total_screensignage', screen_signage);
        
        //Total switch_ports
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
    },
    switch_ports:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        
        //24 Port Switch
        let port = d.switch_ports/24;
        let result = Number.isInteger(port);
        
        if(result === true){
            let tot = Math.floor(port);
            frappe.model.set_value(cdt, cdn, "24port", tot);
            
        }
        else{
            let tot = Math.floor(port);
            frappe.model.set_value(cdt, cdn, "24port", tot+1);
        }
        
        //48 Port Switch
        let port1 = d.switch_ports/48;
        let result1 = Number.isInteger(port1);
        
        if(result1 === true){
            let tot1 = Math.floor(port1);
            frappe.model.set_value(cdt, cdn, "48port", tot1);
            
        }
        else{
            let tot1 = Math.floor(port1);
            frappe.model.set_value(cdt, cdn, "48port", tot1+1);
        }
        
    },
    floor_describtion_add:function(frm, cdt, cdn){
        //Total Wifi
        var total_wifi = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_wifi += d.wifi;
        });
        frm.set_value('total_wifi', total_wifi);
        
        //Total VOIP
        var total_voip = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_voip += d.voip;
        });
        frm.set_value('total_voip', total_voip);
        
        //Total IPTV
        var total_iptv = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_iptv += d.iptv;
        });
        frm.set_value('total_iptv', total_iptv);

        //Total Access Doorbell
        var total_ad = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_ad += d.access_doorbell;
        });
        frm.set_value('custom_total_accessattendance', total_ad);

        //Total printer
        var total_print = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_print += d.printer;
        });
        frm.set_value('custom_total_printer', total_print);

        //Total attendance
        var attendance = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            attendance += d.attendance;
        });
        frm.set_value('custom_total_attendance', attendance);

        //Total screen_signage
        var screen_signage = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            screen_signage += d.screen_signage;
        });
        frm.set_value('custom_total_screensignage', screen_signage);

        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
        
        
    },
    floor_describtion_remove:function(frm, cdt, cdn){
         //Total Wifi
        var total_wifi = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_wifi += d.wifi;
        });
        frm.set_value('total_wifi', total_wifi);
        
        //Total VOIP
        var total_voip = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_voip += d.voip;
        });
        frm.set_value('total_voip', total_voip);
        
        //Total IPTV
        var total_iptv = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_iptv += d.iptv;
        });
        frm.set_value('total_iptv', total_iptv);

        //Total Access Doorbell
        var total_ad = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_ad += d.access_doorbell;
        });
        frm.set_value('custom_total_accessattendance', total_ad);

        //Total printer
        var total_print = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_print += d.printer;
        });
        frm.set_value('custom_total_printer', total_print);

        //Total attendance
        var attendance = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            attendance += d.attendance;
        });
        frm.set_value('custom_total_attendance', attendance);

        //Total screen_signage
        var screen_signage = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            screen_signage += d.screen_signage;
        });
        frm.set_value('custom_total_screensignage', screen_signage);
        
        //Total SwithPort
        var total_swith_port = 0;
        frm.doc.floor_describtion.forEach(function(d) {
            total_swith_port += d.switch_ports;
        });
        frm.set_value('total_switchport', total_swith_port);
    }
    
    
});

//Electric Node Calculation

frappe.ui.form.on("T-Floor Electric Node Calculation", {
    one_port_socket:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        //Total 1port Socket
        var total_one_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_one_port_socket += d.one_port_socket;
        });
        frm.set_value('custom_total_1port', total_one_port_socket);
        
    },
    sec_port_socket:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        //Total 2 port Socket
        var total_sec_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_sec_port_socket += d.sec_port_socket;
        });
        frm.set_value('custom_total_2port', total_sec_port_socket);
        
    },
    
    custom_electric_node_description_add:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        
        //Total 1port Socket
        var total_one_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_one_port_socket += d.one_port_socket;
        });
        frm.set_value('custom_total_1port', total_one_port_socket);
        
        //Total 2 port Socket
        var total_sec_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_sec_port_socket += d.sec_port_socket;
        });
        frm.set_value('custom_total_2port', total_sec_port_socket);
        
        
    },
    custom_electric_node_description_remove:function(frm, cdt, cdn){
        let d = locals[cdt][cdn];
        
        //Total 1port Socket
        var total_one_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_one_port_socket += d.one_port_socket;
        });
        frm.set_value('custom_total_1port', total_one_port_socket);
        
        //Total 2 port Socket
        var total_sec_port_socket = 0;
        frm.doc.custom_electric_node_description.forEach(function(d) {
            total_sec_port_socket += d.sec_port_socket;
        });
        frm.set_value('custom_total_2port', total_sec_port_socket);
        
        
    }
});

frappe.ui.form.on('Customer Site Survey', {
	onload(frm) {
    	if(cur_frm.doc.custom_google_map_link){
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 1);
    	}
    },
    custom_google_map_link(frm) {
	    if(cur_frm.doc.custom_google_map_link){
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 0);
    	}
    	else{
    	    frm.set_df_property('custom_open_with_google_map', "hidden", 1);
    	}
	}
});



