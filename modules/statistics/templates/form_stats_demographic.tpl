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
        <div class="row">
            <div class="col-md-6">
                <H5>Registered candidates</H5>
                <div class="progress">
                    {foreach from=$Subprojects item=proj key=keyid}
                    <div class="progress-bar" role="progressbar" aria-valuenow="{$registered[$keyid].total}" aria-valuemin="0" aria-valuemax="{$target}" style="width: 10%" data-toggle="tooltip" data-placement="bottom" title="{$registered[$keyid].total} {$proj}">
                        <p>
                        {$registered[$keyid].total}
                        <br>
                        {$proj}
                        </p>
                    </div>
                    {/foreach}
                    <p class="pull-right small target">Target: {$target}</p>
                </div>
            </div>
            <div class="col-md-6">
                <H5>Registered candidates currently in or passed screening</H5>
                <div class="progress">
                    {foreach from=$Subprojects item=proj key=keyid}
                    <div class="progress-bar" role="progressbar" aria-valuenow="{$registered[$keyid].visit}" aria-valuemin="0" aria-valuemax="{$target}" style="width: {$registered[$keyid].visit / $target}" data-toggle="tooltip" data-placement="bottom" title="{$registered[$keyid].visit} {$proj}">
                        <p>
                        {$registered[$keyid].visit}
                        <br>
                        {$proj}
                        </p>
                    </div>
                    {/foreach}
                    <p class="pull-right small target">Target: {$target}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <H5>Registered candidates who have come in for a visit</H5>
                <div class="progress">
                    {foreach from=$Subprojects item=proj key=keyid}
                    <div class="progress-bar" role="progressbar" aria-valuenow="{$edi[$keyid].complete}" aria-valuemin="0" aria-valuemax="{$target}" style="width: 10%" data-toggle="tooltip" data-placement="bottom" title="{$edi[$keyid].complete} {$proj}">
                        <p>
                        {$edi[$keyid].complete}
                        <br>
                        {$proj}
                        </p>
                    </div>
                    {/foreach}
                    <p class="pull-right small target">Target: {$target}</p>
                </div>
            </div>
            <div class="col-md-6">
                <H5>Registered candidates with T1 acquired</H5>
                <div class="progress">
                    {foreach from=$Subprojects item=proj key=keyid}
                    <div class="progress-bar" role="progressbar" aria-valuenow="{$scanned[$keyid].complete}" aria-valuemin="0" aria-valuemax="{$target}" style="width: 10%" data-toggle="tooltip" data-placement="bottom" title="{$scanned[$keyid].complete} {$proj}">
                        <p>
                        {$scanned[$keyid].complete}
                        <br>
                        {$proj}
                        </p>
                    </div>
                    {/foreach}
                    <p class="pull-right small target">Target: {$target}</p>
                </div>
            </div>
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
            var registeredTotal = registered[i].total
            if (typeof registeredTotal === 'undefined') {
                registeredTotal = 0;
            }
            var registeredVisit = registered[i].visit
            if (typeof registeredVisit === 'undefined') {
                registeredVisit = 0;
            }
            var ediComplete = edi[i].complete
            if (typeof ediComplete === 'undefined') {
                ediComplete = 0;
            }
            var scannedComplete = scanned[i].complete
            if (typeof scannedComplete === 'undefined') {
                scannedComplete = 0;
            }
            var projectData = [subprojects[i], registeredTotal, registeredVisit, ediComplete, scannedComplete];
            processedData.push(projectData);
        }
        /*var undefinedTotal = registered[null].total
        if (typeof undefinedTotal === 'undefined') {
            undefinedTotal = 0;
        }
        processedData.push(['Undefined Yet', undefinedTotal]);*/
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