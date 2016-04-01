$(function () {
    $("#grid").jqGrid({
        url: "/Product/GetProductLists",
        datatype: 'json',
        mtype: 'Get',
        
        colNames: ['Id', 'Name', 'Description', 'Quantity', 'Price'],
        colModel: [
            { key: true, hidden: true, name: 'Id', index: 'Id', editable: true },
            { key: false, name: 'Name', index: 'Name', editable: true },
            { key: false, name: 'Description', index: 'Description', editable: true },
            { key: false, name: 'Quantity', index: 'Quantity', editable: true },
            { key: false, name: 'Price', index: 'Price', editable: true }
           
        ],
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [5, 10, 20, 30, 40],
        height: '100%',
        viewrecords: true,
        caption: 'Product List',
        emptyrecords: 'No records to display',
        jsonReader: {
            root: "rows",
            page: "page",
            total: "total",
            records: "records",
            repeatitems: false,
            Id: "0"
        },
        autowidth: true,
        multiselect: true,
        multiPageSelection: true,
        onSelectRow: updateIdsOfSelectedRows,
        onSelectAll: function (aRowids, isSelected) {
            var i, count, id;
            for (i = 0, count = aRowids.length; i < count; i++) {
                id = aRowids[i];
                updateIdsOfSelectedRows(id, isSelected);
            }
        },
        loadComplete: function () {
            var $this = $(this), i, count;
            for (i = 0, count = idsOfSelectedRows.length; i < count; i++) {
                $this.jqGrid('setSelection', idsOfSelectedRows[i], false);
            }
        }
    }).navGrid('#pager', { edit: true, add: true, del: true, search: false, refresh: true },
        {
            // edit options
            zIndex: 100,
            url: '/Product/Edit',
            closeOnEscape: true,
            closeAfterEdit: true,
            recreateForm: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },

        {
            // add options
            zIndex: 100,
            url: "/Product/Create",
            closeOnEscape: true,
            closeAfterAdd: true,
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        },
        {
            // delete options
            zIndex: 100,
            url: "/Product/Delete",
            closeOnEscape: true,
            closeAfterDelete: true,
            recreateForm: true,
            msg: "Are you sure you want to delete this task?",
            afterComplete: function (response) {
                if (response.responseText) {
                    alert(response.responseText);
                }
            }
        });

    var $grid = $("#list"), idsOfSelectedRows = [],
    updateIdsOfSelectedRows = function (id, isSelected) {
        var index = $.inArray(id, idsOfSelectedRows);
        if (!isSelected && index >= 0) {
            idsOfSelectedRows.splice(index, 1); // remove id from the list
        } else if (index < 0) {
            idsOfSelectedRows.push(id);
        }
    };

});