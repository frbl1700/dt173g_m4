/*
 *  DT173G - Moment 4 (Typescript)
 *  Fredrik Blank
 */

import fs = require('fs');

class TextFileReader {
    path : string;

    constructor(path: string) {
        this.path = path;
    }

    //Skrive ut N mest använda ord
    public printWords(numberOfWords: number) : void {
        this.getContent((err, data) =>  {
            if (err == null) {
                let count : any = {};
                for (let item of data) {
                    count[item] = (count[item]||0) + 1;
                }
        
                //Sortera
                let sorted = this.getSortedArray(count);
        
                //Skriv ut
                for (var i = 1; i < sorted.length; i++) {
                    console.log(sorted[i]);
                    if(i>=numberOfWords) break;
                }
            } else {
                console.log(err);
            }
        });
    }
    
    private getContent(completion: (error: Error, data: string[]) => void)  {
        let root = this;

        fs.readFile(this.path, 'utf8', function(err, data) {
            if (err) {
                completion(err, null);
            } else {
                try {
                    //Gör om data till en array
                    let content = root.splitContent(data);
                    completion(null, content);
                } catch(err) {
                    completion(err, null);
                }
            }
        });
    }

    //Städa bort skräptecken och skapa array av ord 
    private splitContent(data: string) : string[] {
        let reg : RegExp = /\n| /;
        let arr = data.split(reg);

        return arr;
    }

    //Sorteringsfunktion
    private getSortedArray(data: any) : any[] {
        let sorted : any = [];
    
        for (let key in data) {
            sorted.push([key, data[key]]);
        }
    
        sorted.sort(function(a: any, b: any) { 
            return a[1]-b[1];
        });
    
        sorted.reverse();
    
        return sorted;
    }
}

//Kör
(function() {
    //Initiera textläsare och läs in fil
    let reader = new TextFileReader('data/hitch.txt');

    //Skriv ut mest förekommande ord
    reader.printWords(10);
}());