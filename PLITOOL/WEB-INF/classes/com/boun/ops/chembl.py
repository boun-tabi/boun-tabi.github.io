import sys

from bioservices import UniProt
from chembl_webresource_client import *
from chembl_webresource_client.new_client import new_client

def main(proteinName, organismNumber, thresholdValue):

    print "DB ID\tLigand ID\tLigand SMILES"
    targets = TargetResource()
    u= UniProt()
    """ the search funtion is used to extract the protein IDs from UniProt since the IDs are used as the
    query set for data extraction from the chemical databases"""
    res =u.search('(%s)+AND+organism:%s' % (proteinName, organismNumber), frmt='tab',columns='id, entry name, database(chembl)') 
    identifier = res[42:] #42 is just choosen to get rid off the headers
    new = str(identifier)
    lines = new.split('\n')
    un = []
    name = []
    chembl=[]
    pro=[]

    """ At this step, the information retrieved from the UniProt is saved as separate columns
    depending on the info it has. For instance, after splitting the lines, the first entry is the ID, mid one
    is protein short name and the third one is ChEMBL ID. All of them are saved as separate arrays to use at
    the next step"""

    for i in range(len(lines)):
      lineList = lines[i].split('\t')
      if len(lineList) == 3:
       un.append(lineList[0])
       name.append(lineList[1])
       if len(lineList[2]) is not 0 :
         t=targets.get(lineList[2].strip(';'))
         if t is not None:
             pro.append(lineList[0])

    smil=[]
    chem =[]
    unp=[]

    """
    At the upper part, the chembl IDs equivalent Uniprot IDs are saved if there is a return for the chembl ID
    Due to the fact taht the UniProt IDs are used as the queries for data extraction from ChEMBL database as can
    be seen below
    """

    for i in range(len(pro)):
      targets = new_client.target.filter(target_components__accession=pro[i])
      activities = new_client.activity.filter(target_chembl_id__in=[target['target_chembl_id'] for target in targets])
      for activity in activities:
         act=activity['standard_value']
         if act is not None:
            if int(float(str(act))) <= int(thresholdValue): #defined regarding to output of threshold function
             smil.append(activity['canonical_smiles'])
             chem.append(activity['molecule_chembl_id'])   
             unp.append(pro[i])
             ind=un.index(pro[i])
             if activity['canonical_smiles']is not None:
              print name[ind]+"\t"+activity['molecule_chembl_id']+"\t"+activity['canonical_smiles']


main(sys.argv[1], sys.argv[2], sys.argv[3])

"""
 The data is extracted by using the clients of the ChEMBL database; especially name, molecule id and SMILES
information are parsed to have a suitable table for ligand centric network models."""
