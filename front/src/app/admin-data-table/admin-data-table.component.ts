import { ExportToCsv } from 'export-to-csv';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { StudentServiceService } from '../student.service';
import { Router } from '@angular/router';
import { Injector } from '@angular/core'; 

@Component({
  selector: 'app-admin-data-table',
  templateUrl: './admin-data-table.component.html',
  styleUrls: ['./admin-data-table.component.css'],
})
export class AdminDataTableComponent implements AfterViewInit {
  constructor(private studentService:StudentServiceService, private router:Router,private injector:Injector) { }
  @ViewChild('dataTable')
  table!: { nativeElement: any; };
  dataTable: any;
  dtOption: any = {};
  filteredRows:any=''
  table1:any=""
  today = new Date().toISOString().slice(0, 10);
  

 dataSet:string[][]=[]
 
ngAfterViewInit(): void {
  this.studentService.fetchStudents()
  .subscribe((data:any)=>{
    console.log(data)
    data.forEach((value:any)=>{
      if(value['Status']=="inactive"){
      var propValue:string[]=Object.values(value)
        this.dataSet.push(propValue)
      }
    })
     // this.dataSet.push([ "Test", "Test", "San Francisco", "5384", "2009/12/09", "$85,675" ])
      this.dtOption = {
        "info":     true,
        "searching": true,
        "orderCellsTop": true,
        "fixedHeader": true,
        "dom": 'ltipr' ,
        //"colReorder": true,
        columnDefs: [
         { orderable: false, targets: 0 },
          {
          "targets": [0,1,3,4,5,6,12,14,15,16,17],
            "visible": false,
          } 
       ],
     /*  colReorder: {
        order: [4, 3, 2, 1, 0, 5, 6 ]
    },*/
       data: this.dataSet,
       columns: [
            { title: "Image"},
            { title: "Id"},
            { title: "Name" },
            { title: "Email" },
            { title: "Phone"},
            { title: "Gender" },
            { title: "DOB"},
            { title: "Course"},
            { title: "Highest Qualification"},
            { title: "Skill Set"},
            { title: "Pass Out Year"},
            { title: "Employment Status"},
            { title: "State"},
            { title: "District"},
            { title: "Post"},
            { title: "PinCode"},
            { title: "Status"},
            { title: "Created Date"},
            { title: "Exit Exam Mark"},
          {
            title:" ",
            "className":"details-more",
            "orderable":      false,
            "data":           null,
            "defaultContent": "<button class='btn btn-primary'>More></button>"
        }
        ],
        
          "lengthChange": false
    };
      this.dataTable = $(this.table.nativeElement);
      this.table1=this.dataTable.DataTable(this.dtOption);
      //$( '#display tbody tr' ).addClass('list-group')
      $( '#display tbody' ).on('click', '.details', function () {
        var tr = $(this).closest('tr');
        var row = that.table1.row( tr );
      
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( that.format(row.data()) ).show();
            tr.addClass('shown');
        }
      } );
      $( '#display tbody' ).on('click', '.details-more', function () {
        var id= that.table1.row(this).data()
        console.log(id[1])
        const router = that.injector.get(Router);
        router.navigate(['/students',id[1]]);
      } );
        
    })
    $('#display thead tr:eq(1) th').each( function () {
      var title = $(this).text();
      if(title!="")
      $(this).html( '<input type="text" style="border-radius:10px;border-color:white;" placeholder="Search '+title+'" class="column_search" />' );
    } );
    var that=this
$( '#display thead th'  ).on( 'keyup', ".column_search",function () {
var ind=$(this).parent().index( 'visible' )
that.table1
    .column( $(this).parent().index()+':visIdx' )
    .search( this.value )
    .draw();
that.filteredRows = that.table1.rows({"search" : "applied"}).data()
} );





  }

  options = { 
    filename:'StudentsList_export'+this.today,
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Students List',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    headers: ['Name', 'Email','Phone','Gender','DOB','Course','Qualification','Skills','PassOut Year','Employment Status','State','District','Post','PinCode','Exit Exam Mark']
  };

  format( d:any ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
           '<td rowspan="3"><img style="width: 50px;height: 50px;" class="avatar" src="assets/avatar.png"></td>'+
            '<td>Email:</td>'+
            '<td>'+d[3]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Phone:</td>'+
            '<td>'+d[4]+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Skill Set:</td>'+
            '<td>'+d[9]+'</td>'+
        '</tr>'+
    '</table>';
}
  
  csvExporter = new ExportToCsv(this.options);
  
  generateCSV():void{
    if(this.filteredRows){
      this.filteredRows.each(function ( value:any, index:any ) {
        delete value['0']
        delete value['1']
        delete value['16']
        delete value['17']
        delete value['18']
        console.log( 'Data in index: '+index+' is: '+value );
      } );
      this.csvExporter.generateCsv(this.filteredRows);
    }
    else{
      var data=this.table1.rows().data()
      data.each(function ( value:any, index:any ) {
        delete value['0']
        delete value['1']
        delete value['16']
        delete value['17']
        delete value['18']
        console.log( 'Data in index: '+index+' is: '+value );
      } );
      this.csvExporter.generateCsv(data);
    }
  
  }
}
