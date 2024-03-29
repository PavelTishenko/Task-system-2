import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import {FireService} from "../../services/fire.service";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {Environment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/environment";

type AOA = any[][];


@Component({
  selector: "app-file-parser",
  templateUrl: "./file-parser.component.html",
  styleUrls: ["./file-parser.component.scss"]
})
export class FileParserComponent implements OnInit {
  data: AOA = [ [1, 2], [3, 4] ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  storage = firebase.storage();
  constructor(private db:FireService) {

  }
  ngOnInit() {

  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
