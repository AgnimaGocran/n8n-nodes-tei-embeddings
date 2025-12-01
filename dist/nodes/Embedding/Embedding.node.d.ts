import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, ISupplyDataFunctions, SupplyData } from 'n8n-workflow';
export declare class Embedding implements INodeType {
    description: INodeTypeDescription;
    get type(): string;
    supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData>;
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
//# sourceMappingURL=Embedding.node.d.ts.map