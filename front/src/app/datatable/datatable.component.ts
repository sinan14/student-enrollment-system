import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { data } from 'jquery';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('dataTable')
  table!: { nativeElement: any; };
  dataTable: any;
  dtOption: any = {};
  fname:String=""
  filteredRows:any=''

  data = [
    {
      name: 'Test 1',
      age: 13,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 1',
      age: 11,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
    {
      name: 'Test 4',
      age: 10,
      average: 8.2,
      approved: true,
      description: "using 'Content here, content here' "
    },
  ];

  ngAfterViewInit(): void {
    $('#display thead tr:eq(1) th').each( function () {
      var title = $(this).text();
      $(this).html( '<input type="text" placeholder="Search '+title+'" class="column_search" />' );
  } );
    this.dtOption = {
      "info":     true,
      "searching": true,
      "orderCellsTop": true,
      "fixedHeader": true,
      columnDefs: [
        { orderable: false, targets: 0 }
     ],
        "lengthChange": false
  };
    this.dataTable = $(this.table.nativeElement);
    var table=this.dataTable.DataTable(this.dtOption);
    var that=this
    $( '#display thead'  ).on( 'keyup', ".column_search",function () {
      table
          .column( $(this).parent().index() )
          .search( this.value )
          .draw();
      that.filteredRows = table.rows({"search" : "applied"}).data()
  } );
  
    $('#display tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row( tr );
      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      }
      else {
          // Open this row
          row.child( '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"><tr><td>Full name:</td><td>Ajay</td></tr></table>' ).show();
          tr.addClass('shown');
      }
  } );
  
  }
   
  
    options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ['Position', 'Office','Age','Start Date']
    };
  searchData=this.data
  csvExporter = new ExportToCsv(this.options);

  generateCSV():void{
    this.filteredRows.each(function ( value:any, index:any ) {
      delete value['0']
      console.log( 'Data in index: '+index+' is: '+value );
  } );
    this.csvExporter.generateCsv(this.filteredRows);
  }

  Search(){
    console.log(this.fname)
    if(this.fname!=" "){
      this.searchData= this.searchData.filter((student)=>{
        return student['name']==this.fname
     })
    }
    
   console.log(this.searchData)

  }
  myFunction(event:any) {
    console.log(event.target.placeholder)
    var search=event.target.placeholder
    var str= event.target.value
    switch(search){
      case'name':this.searchData= this.searchData.filter((student)=>{
        return student['name'].startsWith(str)
     })
     break;
     case 'age':this.searchData= this.searchData.filter((student)=>{
      return student['age']==str
   })
   break;
    }
     
    
    console.log(this.searchData)
  }

}


