
// __main__
var tables = document.getElementsByTagName("table")
var percentages = findPercentages(tables)
calculateInternals(percentages);

// goes through each table, looks for total and obtained marks, returns list of percentages calculated
function findPercentages(tables)
{
    var percentages = []
    for(i = 0; i<tables.length; i++)
    {
        var totalMarks      = 0;
        var obtainedMarks   = 0;
        var percentage      = 0;

        var table = tables[i];
        var rows = tables[i].getElementsByTagName("tr");
        var singleTotalMarks = 0;
        var singleObtainedMarks = 0;

        for(j = 0; j<rows.length; j++)
        {
            var row = rows[j];
            var trow = $(row);

            if(j === 0){

                trow.append('<td class="thead" style="background: #1E1F4A; color: white;">Percentage</td>');
            }else{

                singleTotalMarks = parseFloat(row.cells[2].innerText);
                singleObtainedMarks = parseFloat(row.cells[1].innerText);
                singlePercentage = (singleObtainedMarks * 100) / singleTotalMarks;
                singlePercentage = roundToTwo(singlePercentage);
                var bar = '<div class="progress active progress-striped" style="height: 20px;"><div class="progress-bar bg-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="1" style="width: ' + singlePercentage + '%;"> ' + singlePercentage + '%</div></div>';
                trow.append(bar);
            }

            totalMarks += singleTotalMarks;
            obtainedMarks += singleObtainedMarks;
        }

         percentage = (obtainedMarks * 100) / totalMarks;
         percentage = roundToTwo(percentage);
         percentages.push(percentage);
         table = $(table);

         table.append("<tr><td>Total</td><td>" + obtainedMarks+ "</td><td>" + totalMarks + "</td> <td> ...</td> <td>" + percentage + "% </td> </tr>");
    }
    return percentages;
}



// given array of percentages, it calculates total internal marks
// creates a table and shows internal marks in that table
function calculateInternals(percentages)
{

    var quizzez             = 0.0;
    var assignments         = 0.0;
    var sessional1          = 0.0;
    var sessional2          = 0.0;
    var totalInternal       = 0.0;
    var internalsPercentage = 0.0;
    var gpa                 = 0.0;


    if(percentages.length == 4)
    {
        quizzez     = roundToTwo(percentages[0] / 100 * 15);
        assignments = roundToTwo(percentages[1] / 100 * 10);
        sessional1  = roundToTwo(percentages[2] / 100 * 10);
        sessional2  = roundToTwo(percentages[3] / 100 * 15);

        // console.log("quizzez" + quizzez)
        // console.log("assignments" + assignments)
        // console.log("sessional1" + sessional1)
        // console.log("sessional2" + sessional2)


    }
    else if(percentages.length == 7)
    {
        quizzez     = roundToTwo(percentages[0] / 100 * 15);
        assignments = roundToTwo(percentages[1] / 100 * 10);
        sessional1  = roundToTwo(percentages[2] / 100 * 10);
        sessional2  = roundToTwo(percentages[5] / 100 * 15);


    }

    var totalInternal = quizzez + sessional1 + sessional2 + assignments;
    var internalsPercentage = totalInternal * 100 / 50;
    internalsPercentage = roundToTwo(internalsPercentage);

    var gpa = 0;

    switch (true) {
        case internalsPercentage >= 90:
            gpa = 4.0
            break;
        case internalsPercentage >= 85:
            gpa = 3.7
            break;
        case internalsPercentage >= 80:
            gpa = 3.3
            break;
        case internalsPercentage >= 75:
            gpa = 3.0
                break;
        case internalsPercentage >= 70:
            gpa = 2.7
                break;
        case internalsPercentage >= 65:
            gpa = 2.3
            break;
        case internalsPercentage >= 60:
           gpa = 2.0


        default:
            gpa = 0.0
            break;

    }

    var cArea = $(".table-responsive quiz_listing")[0];
    cArea = $(cArea);
    var internalsTable =
    '<table class = "table table-striped table-border " style = "text-align: center;"> <div style="background:#13A89E;margin: 10px;text-align: center;padding: 10px;font-weight: bold;color: white;font-size: 16px;" ;>Internals </div>  <tr> <th style="text-align: center";>Internal Marks</th> <th style="text-align: center;">Out of</th> <th style="text-align: center";>Percentage</th> <th style="text-align: center";>GPA</th> </tr> <tr> <td> ' + totalInternal +' </td> <td> 50 </td> <td> '+ internalsPercentage + ' </td> <td> ' + gpa + ' </td> </tr> </table> ';

    $('.content_area').prepend(internalsTable);

    var summary = '<table class = "table table-striped table-border " style = "text-align: center; width: 98%; margin: 0 auto;"> <div style="background:#13A89E;margin: 10px;text-align: center;padding: 10px;font-weight: bold;color: white;font-size: 16px;" ;> Summary </div> <tr> <th style="background: #1E1F4A; color: white;" ></th> <th style="background: #1E1F4A; color: white; text-align: center;" >Obtained</th> <th style="background: #1E1F4A; color: white; text-align: center;" >Total</th> </tr> <tr> <th style="background: #1E1F4A; color: white;" >Quizzez</th> <td>'+ quizzez +'</td> <td>15</td>  </tr> <tr> <th style="background: #1E1F4A; color: white;" >Assignments</th> <td>'+ assignments +'</td> <td>10</td>  </tr> <tr> <th style="background: #1E1F4A; color: white;" >Sessional 1</th> <td>'+ sessional1+'</td> <td>10</td>  </tr> <tr> <th style="background: #1E1F4A; color: white;" >Sessional 2</th> <td>'+ sessional2+'</td> <td>15</td>  </tr> </table> ';

    $(".content_area").prepend(summary);

}



// found on stackoverflow
// rounding a number to 2 digits, accurately
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
