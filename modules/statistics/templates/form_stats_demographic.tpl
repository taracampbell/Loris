<link rel="stylesheet" href="css/c3.css">
<script src="js/d3.min.js" charset="utf-8"></script>
<script src="js/c3.min.js"></script>

<div id="demographics">
    <h2 class="statsH2">General statistics{if $CurrentSite} for {$CurrentSite.Name}{/if}
    {if $CurrentProject} for {$CurrentProject.Name} {/if}</h2>

    <div class="col-sm-2">
    {html_options id="DemographicSite" options=$Sites name="DemographicSite" selected=$CurrentSite.ID class="form-control"}
    </div>
    <div class="col-sm-3">
    {html_options id="DemographicProject" options=$Projects name="DemographicProject" selected=$CurrentProject.ID class="form-control"}
    </div>

    <script type="text/javascript" src="GetJS.php?Module=statistics&file=form_stats_demographic.js"></script>
    <button onClick="updateDemographicTab()" class="btn btn-primary btn-small">Filter</button>
    <br><br>
    <div class="col-md-12">
        <div class="row">
            <div id="demographicsChart"></div>
        </div>
    </div>

{$RecruitsTable}
</div>

<script>

    function formatDemographicsData() {
        "use strict";

        var subprojects = {$Subprojects|@json_encode};
        var registered = {$registered|@json_encode};
        var edi = {$edi|@json_encode};
        var scanned = {$scanned|@json_encode};

        var processedData = new Array();
        for (var i in subprojects) {
            var projectData = [subprojects[i], 0, registered[i].visit, edi[i].complete, scanned[i].complete];
            processedData.push(projectData);
        }

        console.log(processedData);

        return processedData;
    }

    var dataColumns = formatDemographicsData();

    var demographicsChart = c3.generate({
        bindto: '#demographicsChart',
        data: {
            columns: dataColumns,
            type : 'bar',
            groups: [
                ['data1', 'data2']
            ]
        },
        axis: {
            x: {
                type : 'categorized',
                categories: ['Registered candidates', 'Registered candidates currently in or passed screening', 'Registered candidates who have come in for a visit', 'Registered candidates with T1 acquired']
            },
            y: {
                label: 'Candidates'
            }
        },
    });
</script>